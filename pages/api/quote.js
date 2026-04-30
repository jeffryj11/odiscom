import { supabase } from '../../lib/supabase'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, company, email, phone, details } = req.body

  const quoteId = `OSQ-${Date.now()}`

  // Save to DB
  const { error } = await supabase.from('quotes').insert([
    {
      quote_id: quoteId,
      name,
      company,
      email,
      phone,
      details,
      status: 'pending'
    }
  ])

  if (error) {
    return res.status(500).json({ success: false, error: error.message })
  }

  // Email setup (only if env vars exist)
  if (process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Email to YOU
    await transporter.sendMail({
      from: `Odiscom Supply <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Quote Request: ${quoteId}`,
      text: `New quote request received:\n\nCompany: ${company}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nDetails:\n${details}`
    })

    // Confirmation to CUSTOMER
    await transporter.sendMail({
      from: `Odiscom Supply <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Quote Request Received (${quoteId})`,
      text: `Thanks for your request. Your quote ID is ${quoteId}. We will contact you shortly.`
    })
  }

  return res.status(200).json({
    success: true,
    quoteId,
  })
}
