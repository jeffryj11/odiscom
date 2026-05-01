import PDFDocument from 'pdfkit'
import { supabase } from '../../../../lib/supabase'

export default async function handler(req, res) {
  const { id } = req.query

  const { data: quote } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single()

  const { data: items } = await supabase
    .from('quote_items')
    .select('*')
    .eq('quote_id', id)

  const doc = new PDFDocument({ margin: 40 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `inline; filename=quote-${quote.quote_id}.pdf`)

  doc.pipe(res)

  // Header
  doc.fontSize(20).text('Odiscom Supply', { align: 'center' })
  doc.moveDown()

  doc.fontSize(16).text(`Quote ${quote.quote_id}`)
  doc.text(`Company: ${quote.company}`)
  doc.text(`Contact: ${quote.name}`)
  doc.text(`Email: ${quote.email}`)
  doc.moveDown()

  // Table Header
  doc.fontSize(12).text('Items:', { underline: true })
  doc.moveDown(0.5)

  let total = 0

  items.forEach(item => {
    const line = `${item.product_name} | Qty: ${item.quantity} | $${item.unit_price} | Total: $${item.total_price}`
    doc.text(line)
    total += Number(item.total_price || 0)
  })

  doc.moveDown()
  doc.fontSize(14).text(`Total: $${total}`, { align: 'right' })

  doc.end()
}
