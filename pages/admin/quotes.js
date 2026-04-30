import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { supabase } from '../../lib/supabase'

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadQuotes() {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setQuotes(data || [])
      }

      setLoading(false)
    }

    loadQuotes()
  }, [])

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <section className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">Quote Admin</h1>
            <p className="mt-3 text-slate-200">Review incoming Odiscom Supply quote requests.</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10">
          {loading && <p className="text-gray-600">Loading quotes...</p>}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && quotes.length === 0 && (
            <div className="bg-white border rounded-xl p-8 text-center text-gray-600">
              No quote requests yet.
            </div>
          )}

          {!loading && !error && quotes.length > 0 && (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="text-left px-4 py-3">Quote ID</th>
                      <th className="text-left px-4 py-3">Company</th>
                      <th className="text-left px-4 py-3">Contact</th>
                      <th className="text-left px-4 py-3">Email</th>
                      <th className="text-left px-4 py-3">Phone</th>
                      <th className="text-left px-4 py-3">Status</th>
                      <th className="text-left px-4 py-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="border-t align-top">
                        <td className="px-4 py-4 font-mono text-blue-700">{quote.quote_id}</td>
                        <td className="px-4 py-4 font-semibold">{quote.company}</td>
                        <td className="px-4 py-4">{quote.name}</td>
                        <td className="px-4 py-4">{quote.email}</td>
                        <td className="px-4 py-4">{quote.phone}</td>
                        <td className="px-4 py-4">
                          <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {quote.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-500">
                          {quote.created_at ? new Date(quote.created_at).toLocaleString() : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
