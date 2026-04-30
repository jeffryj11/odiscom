export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const quoteId = `OSQ-${Date.now()}`

  return res.status(200).json({
    success: true,
    quoteId,
    message: 'Quote request received',
  })
}
