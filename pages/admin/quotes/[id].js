import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { supabase } from '../../../lib/supabase'

export default function QuoteDetail() {
  const router = useRouter()
  const { id } = router.query

  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!id) return

    async function loadQuote() {
      const { data } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single()

      setQuote(data)
      setNotes(data?.internal_notes || '')
      setLoading(false)
    }

    loadQuote()
  }, [id])

  if (loading) return <p className="p-10">Loading...</p>

  if (!quote) return <p className="p-10">Quote not found</p>

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <section className="bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold">Quote {quote.quote_id}</h1>
            <p className="text-slate-200 mt-2">Submitted by {quote.company}</p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-10 space-y-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Contact Info</h2>
            <p><strong>Name:</strong> {quote.name}</p>
            <p><strong>Email:</strong> {quote.email}</p>
            <p><strong>Phone:</strong> {quote.phone}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            <p className="whitespace-pre-wrap">{quote.details}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Internal Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              rows="5"
              placeholder="Add internal notes, pricing decisions, follow-ups..."
            />
            <button
              onClick={async () => {
                await supabase
                  .from('quotes')
                  .update({ internal_notes: notes })
                  .eq('id', quote.id)

                alert('Notes saved')
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
            >
              Save Notes
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Status</h2>
            <select
              value={quote.status}
              onChange={async (e) => {
                const newStatus = e.target.value
                await supabase
                  .from('quotes')
                  .update({ status: newStatus })
                  .eq('id', quote.id)

                setQuote({ ...quote, status: newStatus })
              }}
              className="border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
