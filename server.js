require('dotenv').config();

const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/scss', express.static(path.join(__dirname, 'scss')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, website } = req.body || {};

  // Honeypot: bots fill hidden fields, humans never see them.
  if (website) {
    return res.json({ ok: true });
  }

  if (!name || !email || !phone || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Preencha todos os campos corretamente.' });
  }

  try {
    await transporter.sendMail({
      from: `"Site Lithium Entertainment" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Novo contato pelo site: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`,
      html: `
        <h2>Novo contato via site Lithium Entertainment</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Erro ao enviar e-mail de contato:', err);
    res.status(500).json({ ok: false, error: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Lithium rodando em http://localhost:${PORT}`);
});
