"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = "contacto@adfinity.com.mx";

export async function processContactForm(data: { name: string; email: string; message: string }) {
  try {
    // 1. Correo para el Administrador
    const adminEmailPromise = resend.emails.send({
      from: `Adfinity <${adminEmail}>`,
      to: [adminEmail],
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Has recibido un nuevo mensaje desde el sitio web</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Correo:</strong> ${data.email}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="border-left: 4px solid #C8F02A; padding-left: 16px; color: #444;">
            ${data.message}
          </blockquote>
        </div>
      `,
    });

    // 2. Correo de confirmación para el Cliente
    const clientEmailPromise = resend.emails.send({
      from: `Adfinity <${adminEmail}>`,
      to: [data.email],
      subject: `Hemos recibido tu mensaje - Adfinity`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>¡Hola, ${data.name}!</h2>
          <p>Gracias por escribirnos. Hemos recibido tu mensaje correctamente y nuestro equipo creativo lo está revisando.</p>
          <p>Nos pondremos en contacto contigo lo más pronto posible para platicar sobre tu proyecto.</p>
          <br/>
          <p>Saludos,<br/><strong>El equipo de Adfinity</strong></p>
        </div>
      `,
    });

    // Ejecutamos ambos envíos al mismo tiempo
    await Promise.all([adminEmailPromise, clientEmailPromise]);

    return { success: true };
  } catch (error) {
    console.error("Resend Contact Error:", error);
    return { success: false, error: "Hubo un error al enviar el mensaje." };
  }
}