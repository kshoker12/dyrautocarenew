import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { bookingAdminHtml } from '../../../lib/email-templates/booking';
import { confirmationHtml } from '../../../lib/email-templates/confirmation';

function normalizeBody(body) {
  const information = { ...body };
  information.mobile = information.mobile ? 'Yes' : 'No';
  if (information.package === 'Ceramic Coating' && information.options?.[0]) {
    information.package = information.package + ' - ' + information.options[0];
  }
  information.addons = Array.isArray(information.addons) ? information.addons : [];
  return information;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { package: pkg, name, email, phone, date, preferred, mobile, address, vehicle, additional, addons } = body;

    if (!pkg || !name || !email || !phone || !date || !vehicle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const information = normalizeBody(body);

    const fromAddress = process.env.MAIL_FROM_ADDRESS || 'skabgaming101@gmail.com';
    const fromName = process.env.MAIL_FROM_NAME || 'DYR Autocare Helper';

    // Use same env vars as Laravel (MAIL_*) so you can copy .env from old project
    const mailUser = process.env.MAIL_USERNAME || process.env.SMTP_USER || fromAddress;
    const mailPass = process.env.MAIL_PASSWORD || process.env.SMTP_PASS;
    const mailHost = process.env.MAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const mailPort = Number(process.env.MAIL_PORT || process.env.SMTP_PORT || 587);

    if (!mailUser || !mailPass) {
      console.error('Booking email: MAIL_USERNAME and MAIL_PASSWORD (or SMTP_USER and SMTP_PASS) must be set in .env');
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const adminHtml = bookingAdminHtml(information);
    const customerHtml = confirmationHtml(information);

    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: 'dyrautocare@gmail.com',
      subject: 'New Booking Request',
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"DYR Autocare" <${fromAddress}>`,
      to: email,
      subject: 'Request Received',
      html: customerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Booking email error:', err);
    return NextResponse.json({ error: 'Failed to send booking request' }, { status: 500 });
  }
}
