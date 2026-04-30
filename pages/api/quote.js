import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, company, email, phone, details } = req.body

  const quoteId = `OSQ-${Date.now()}`

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

  return res.status(200).json({
    success: true,
    quoteId,
  })
}
