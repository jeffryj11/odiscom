import PDFDocument from 'pdfkit'
import nodemailer from 'nodemailer'
import { supabase } from '../../../../lib/supabase'

function buildQuotePdfBuffer(quote, items) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 })
    const chunks = []

    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    let total = 0

    doc.fontSize(22).text('Odiscom Supply', { align: 'center' })
    doc.moveDown()
    doc.fontSize(16).text(`Quote ${quote.quote_id}`)
    doc.moveDown(0.5)
    doc.fontSize(11).text(`Company: ${quote.company}`)
    doc.text(`Contact: ${quote.name}`)
    doc.text(`Email: ${quote.email}`)
    if (quote.phone) doc.text(`Phone: ${quote.phone}`)
    doc.moveDown()

    doc.fontSize(12).text('Quote Items', { underline: true })
    doc.moveDown(0.5)

    items.forEach(item => {
      const lineTotal = Number(item.total_price || 0)
      total += lineTotal
      doc.fontSize(10).text(`${item.product_name}`)
      doc.text(`Qty: ${item.quantity}    Unit Price: $${item.unit_price || 0}    Total: $${lineTotal.toFixed(2)}`)
      doc.moveDown(0.5)
    })

    doc.moveDown()
    doc.fontSize(14).text(`Quote Total: $${total.toFixed(2)}`, { align: 'right' })
    doc.moveDown()
    doc.fontSize(9).text('Quote is subject to final availability, lead time, taxes, freight, and written acceptance. Pricing may change if scope, quantities, or product availability changes.')

    doc.end()
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { id } = req.query

  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single()

  if (quoteError || !quote) {
    return res.status(404).json({ success: false, message: 'Quote not found' })
  }

  const { data: items, error: itemsError } = await supabase
    .from('quote_items')
    .select('*')
    .eq('quote_id', id)

  if (itemsError) {
    return res.status(500).json({ success: false, message: itemsError.message })
  }

  if (!process.env.SMTP_HOST) {
    return res.status(500).json({ success: false, message: 'SMTP is not configured' })
  }

  const pdfBuffer = await buildQuotePdfBuffer(quote, items || [])

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `Odiscom Supply <${process.env.SMTP_USER}>`,
    to: quote.email,
    cc: process.env.NOTIFY_EMAIL || undefined,
    subject: `Odiscom Supply Quote ${quote.quote_id}`,
    text: `Hello ${quote.name},\n\nAttached is your Odiscom Supply quote ${quote.quote_id}.\n\nPlease reply to this email with any questions or changes.\n\nThank you,\nOdiscom Supply`,
    attachments: [
      {
        filename: `quote-${quote.quote_id}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })

  await supabase
    .from('quotes')
    .update({ status: 'quoted' })
    .eq('id', id)

  return res.status(200).json({ success: true, message: 'Quote PDF sent' })
}
