import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { name, email, phone, message, website } = body || {};

  // Honeypot: bots preenchem campos ocultos, humanos nunca veem.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !phone || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Preencha todos os campos corretamente." }, { status: 400 });
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
        <p>${String(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail de contato:", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar sua mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
