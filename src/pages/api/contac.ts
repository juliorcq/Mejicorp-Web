import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, company, service, budget, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Campos obligatorios faltantes" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>Nuevo mensaje desde Mejicorp</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Empresa:</strong> ${company || "-"}</p>
      <p><strong>Servicio:</strong> ${service || "-"}</p>
      <p><strong>Presupuesto:</strong> ${budget || "-"}</p>
      <hr/>
      <p>${message}</p>
    `;

    await transporter.sendMail({
      from: `"Mejicorp Web" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Nuevo contacto desde la web",
      html,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ error: "Error enviando mensaje" }),
      { status: 500 }
    );
  }
};
