import nodemailer from 'nodemailer';
import type { NextRequest } from 'next/server';

// Expect environment variables for secure email sending
// EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS must be set in .env.local
// EMAIL_TO can default to tranquilityvibe@gmail.com if not provided

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name?: string; email?: string; subject?: string; message?: string;
    };

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const host = process.env.EMAIL_HOST;
    const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO || 'tranquilityvibe@gmail.com';

    if (!host || !port || !user || !pass) {
      console.error('Email environment variables not fully set');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for others
      auth: { user, pass }
    });

    const mailOptions = {
      from: `Website Contact <${user}>`,
      replyTo: email,
      to,
      subject: `[Website] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <hr />
             <p style="white-space:pre-line;">${message}</p>`
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
  }
}
