require('dotenv').config();

const nodemailer = require('nodemailer');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

module.exports = async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  const { name, email, phone, message, website } = req.body || {};

  // Honeypot: bots fill hidden fields, humans never see them.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !phone || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Preencha todos os campos corretamente.' });
  }

  try {
    await getTransporter().sendMail({
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

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erro ao enviar e-mail de contato:', err);
    res.status(500).json({ ok: false, error: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.' });
  }
};
