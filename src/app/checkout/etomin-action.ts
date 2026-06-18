"use server";

import { Resend } from "resend";

const ETOMIN_BASE_URL = "https://pagos.etomin.com/api/v1";
const ETOMIN_EMAIL = process.env.ETOMIN_EMAIL || "tu_correo_etomin@ejemplo.com";
const ETOMIN_PASSWORD = process.env.ETOMIN_PASSWORD || "tu_contraseña_etomin";

// Configuración de Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL || "contacto@trazocreative.com";
const senderEmail = process.env.SENDER_EMAIL || "envios@trazocreative.com";

// 1. Definimos la forma estricta de los datos 
export interface CartItemPayload {
  name: string;
  price: number;
  qty: number;
  sku: string;
}

export interface EtominPaymentPayload {
  amount: number;
  billing: {
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
  };
  cardData: {
    cardName: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvc: string;
  };
  items: CartItemPayload[];
}

// 2. Aplicamos la interfaz al parámetro principal
export async function processEtominPayment(data: EtominPaymentPayload) {
  try {
    // 1. SIGN IN (Obtener Token de Autenticación)
    const signinRes = await fetch(`${ETOMIN_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ETOMIN_EMAIL, password: ETOMIN_PASSWORD }),
    });
    const signinData = await signinRes.json();
    
    if (!signinData.authToken) {
      return { success: false, error: "Error de autenticación con la pasarela." };
    }
    const authToken = signinData.authToken;

    // 2. TOKENIZAR TARJETA
    const cardTokenRes = await fetch(`${ETOMIN_BASE_URL}/card/tokenizer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        cardData: {
          cardNumber: data.cardData.cardNumber,
          cardholderName: data.cardData.cardName,
          expirationMonth: data.cardData.expMonth,
          expirationYear: data.cardData.expYear,
        }
      }),
    });
    const cardTokenData = await cardTokenRes.json();

    if (!cardTokenData.cardNumberToken) {
      return { success: false, error: "Error al tokenizar la tarjeta. Verifica los datos." };
    }

    // 3. PROCESAR VENTA (SALE)
    const orderId = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const salePayload = {
      amount: data.amount,
      currency: 484, // 484 = MXN
      reference: orderId,
      customerInformation: {
        firstName: data.billing.firstName,
        lastName: data.billing.lastName,
        email: data.billing.email,
        phone1: data.billing.phone,
        city: data.billing.city,
        address1: data.billing.address,
        postalCode: data.billing.zip,
        state: data.billing.city,
        country: data.billing.country,
        ip: "127.0.0.1",
      },
      cardData: {
        cardNumberToken: cardTokenData.cardNumberToken,
        cvv: data.cardData.cvc,
      },
      // Aplicamos la interfaz aquí también
      items: data.items.map((item: CartItemPayload) => ({
        title: item.name,
        amount: item.price,
        quantity: item.qty,
        id: item.sku,
      })),
      redirectUrl: "https://trazocreative.com/checkout"
    };

    const saleRes = await fetch(`${ETOMIN_BASE_URL}/sale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(salePayload),
    });

    const saleData = await saleRes.json();

    // 4. SI EL PAGO ES EXITOSO, ENVIAR CORREOS
    if (saleData.status === "APPROVED" || saleData.status === "PENDING") {
      
      // Aplicamos la interfaz en el map de los items HTML
      const itemsHtml = data.items.map((item: CartItemPayload) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} <br/> <small style="color: #666;">SKU: ${item.sku}</small></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.qty).toLocaleString('es-MX')}</td>
        </tr>
      `).join('');

      // Formatear Total
      const totalFormat = `$${Number(data.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;

      // Correo para Administrador
      const adminOrderEmail = resend.emails.send({
        from: `Trazo Creative Pedidos <${senderEmail}>`,
        to: [adminEmail],
        subject: `Nueva compra en línea - Pedido ${orderId}`,
        html: `
          <div style="font-family: sans-serif; color: #111;">
            <h2>¡Tienes un nuevo pedido! (#${orderId})</h2>
            <h3>Datos del cliente:</h3>
            <p>
              <strong>Nombre:</strong> ${data.billing.firstName} ${data.billing.lastName}<br/>
              <strong>Correo:</strong> ${data.billing.email}<br/>
              <strong>Teléfono:</strong> ${data.billing.phone}<br/>
              <strong>Dirección:</strong> ${data.billing.address}, ${data.billing.city}, C.P. ${data.billing.zip}, ${data.billing.country}
            </p>
            <h3>Detalle del pedido:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8f8f8;">
                  <th style="padding: 10px; text-align: left;">Servicio</th>
                  <th style="padding: 10px; text-align: center;">Cant.</th>
                  <th style="padding: 10px; text-align: right;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total Pagado:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; color: #8DBF15;">${totalFormat} MXN</td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
      });

      // Correo para Cliente
      const clientOrderEmail = resend.emails.send({
        from: `Trazo Creative <${senderEmail}>`,
        to: [data.billing.email],
        subject: `Confirmación de tu pedido ${orderId} - Trazo Creative`,
        html: `
          <div style="font-family: sans-serif; color: #111;">
            <h2>¡Hola, ${data.billing.firstName}! Gracias por tu compra.</h2>
            <p>Hemos recibido tu pago correctamente y tu pedido <strong>#${orderId}</strong> está confirmado.</p>
            <p>Nuestro equipo creativo se pondrá en contacto contigo muy pronto a través de este correo para dar el banderazo de salida a tu proyecto.</p>
            
            <h3>Resumen de tu compra:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f8f8f8;">
                  <th style="padding: 10px; text-align: left;">Servicio</th>
                  <th style="padding: 10px; text-align: center;">Cant.</th>
                  <th style="padding: 10px; text-align: right;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <p style="font-size: 18px; text-align: right;"><strong>Total pagado: <span style="color: #8DBF15;">${totalFormat} MXN</span></strong></p>
            <br/>
            <p>Si tienes alguna pregunta, responde directamente a este correo.</p>
            <p>Saludos,<br/><strong>El equipo de Trazo Creative</strong></p>
          </div>
        `,
      });

      // Enviar de forma asíncrona
      Promise.all([adminOrderEmail, clientOrderEmail]).catch((err) => 
        console.error("Error enviando correos de confirmación:", err)
      );

      return { success: true, orderId: orderId, redirect: saleData.redirectTo };
    } else {
      return { success: false, error: `Pago declinado o fallido. Estado: ${saleData.status}` };
    }

  } catch (error) {
    console.error("Etomin Payment Error:", error);
    return { success: false, error: "Excepción del servidor al procesar el pago." };
  }
}