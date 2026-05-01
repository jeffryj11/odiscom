import PDFDocument from 'pdfkit'

function money(value) {
  return `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function drawRow(doc, y, columns, options = {}) {
  const { bold = false, fill = null } = options

  if (fill) {
    doc.rect(40, y - 6, 532, 24).fill(fill)
  }

  doc.fillColor(options.color || '#111827')
  doc.font(bold ? 'Helvetica-Bold' : 'Helvetica')
  doc.fontSize(options.size || 9)

  columns.forEach((col) => {
    doc.text(col.text, col.x, y, {
      width: col.width,
      align: col.align || 'left',
    })
  })

  doc.fillColor('#111827')
}

export function buildProfessionalQuotePdf(quote, items = []) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margin: 40 })
    const chunks = []

    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const pageWidth = doc.page.width
    const left = 40
    const right = pageWidth - 40
    const today = new Date().toLocaleDateString()
    const total = items.reduce((sum, item) => sum + Number(item.total_price || 0), 0)

    // Top brand bar
    doc.rect(0, 0, pageWidth, 92).fill('#0f172a')
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(24).text('Odiscom Supply', left, 28)
    doc.font('Helvetica').fontSize(9).fillColor('#cbd5e1').text('Telecom infrastructure materials, tools, fiber, splicing, and contractor supply', left, 58)
    doc.font('Helvetica-Bold').fontSize(18).fillColor('#ffffff').text('QUOTE', 430, 30, { width: 140, align: 'right' })
    doc.font('Helvetica').fontSize(9).fillColor('#cbd5e1').text(quote.quote_id || '', 430, 56, { width: 140, align: 'right' })

    // Customer and quote metadata cards
    doc.fillColor('#111827')
    doc.roundedRect(left, 118, 250, 108, 8).fillAndStroke('#ffffff', '#e5e7eb')
    doc.roundedRect(322, 118, 250, 108, 8).fillAndStroke('#ffffff', '#e5e7eb')

    doc.font('Helvetica-Bold').fontSize(10).fillColor('#0f172a').text('Prepared For', 56, 134)
    doc.font('Helvetica').fontSize(9).fillColor('#374151')
    doc.text(quote.company || '-', 56, 154)
    doc.text(quote.name || '-', 56, 170)
    doc.text(quote.email || '-', 56, 186)
    if (quote.phone) doc.text(quote.phone, 56, 202)

    doc.font('Helvetica-Bold').fontSize(10).fillColor('#0f172a').text('Quote Summary', 338, 134)
    doc.font('Helvetica').fontSize(9).fillColor('#374151')
    doc.text(`Quote Date: ${today}`, 338, 154)
    doc.text(`Status: ${(quote.status || 'pending').toUpperCase()}`, 338, 170)
    doc.text('Validity: Subject to availability', 338, 186)
    doc.text('Payment: To be confirmed', 338, 202)

    // Intro
    doc.fillColor('#374151').font('Helvetica').fontSize(10)
    doc.text('Thank you for the opportunity to provide pricing. The items below are based on the current requested scope and are subject to final availability, freight, taxes, and written acceptance.', left, 252, { width: 532 })

    // Table header
    let y = 304
    drawRow(doc, y, [
      { text: 'Item', x: 52, width: 250 },
      { text: 'Qty', x: 314, width: 50, align: 'right' },
      { text: 'Unit Price', x: 386, width: 80, align: 'right' },
      { text: 'Line Total', x: 486, width: 70, align: 'right' },
    ], { bold: true, fill: '#e5e7eb', color: '#0f172a' })

    y += 30

    if (!items.length) {
      doc.font('Helvetica').fontSize(10).fillColor('#6b7280').text('No line items added yet.', 52, y)
      y += 28
    }

    items.forEach((item, index) => {
      if (y > 690) {
        doc.addPage()
        y = 60
      }

      const fill = index % 2 === 0 ? '#ffffff' : '#f8fafc'
      doc.rect(left, y - 8, 532, 34).fillAndStroke(fill, '#e5e7eb')
      drawRow(doc, y, [
        { text: item.product_name || '-', x: 52, width: 250 },
        { text: String(item.quantity || 0), x: 314, width: 50, align: 'right' },
        { text: money(item.unit_price), x: 386, width: 80, align: 'right' },
        { text: money(item.total_price), x: 486, width: 70, align: 'right' },
      ])
      y += 34
    })

    // Total box
    y += 16
    doc.roundedRect(360, y, 212, 54, 8).fillAndStroke('#0f172a', '#0f172a')
    doc.font('Helvetica').fontSize(10).fillColor('#cbd5e1').text('Quote Total', 378, y + 12)
    doc.font('Helvetica-Bold').fontSize(18).fillColor('#ffffff').text(money(total), 430, y + 29, { width: 124, align: 'right' })

    // Terms
    y += 86
    if (y > 680) {
      doc.addPage()
      y = 60
    }
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#0f172a').text('Terms & Conditions', left, y)
    doc.font('Helvetica').fontSize(8).fillColor('#4b5563').text(
      'This quote is provided for planning and purchasing purposes only. Pricing is subject to change based on manufacturer availability, freight, taxes, tariffs, lead times, final scope, and written acceptance. Special-order, private-label, custom cable, trailer, and bulk items may require deposit or full payment before procurement. Odiscom Supply reserves the right to correct typographical or pricing errors prior to acceptance.',
      left,
      y + 16,
      { width: 532 }
    )

    // Footer
    doc.fontSize(8).fillColor('#64748b')
    doc.text('OdiscomSupply.com | Telecom infrastructure supply built by field-experienced professionals', left, 742, { width: 532, align: 'center' })

    doc.end()
  })
}
