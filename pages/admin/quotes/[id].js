import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { supabase } from '../../../lib/supabase'
import { products } from '../../../data/products'

export default function QuoteDetail() {
  const router = useRouter()
  const { id } = router.query

  const [quote, setQuote] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')

  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return

    async function loadData() {
      const { data: quoteData } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single()

      const { data: itemsData } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', id)

      setQuote(quoteData)
      setItems(itemsData || [])
      setNotes(quoteData?.internal_notes || '')
      setLoading(false)
    }

    loadData()
  }, [id])

  async function addItem() {
    const product = products.find(p => p.slug === selectedProduct)
    if (!product) return

    const { data } = await supabase.from('quote_items').insert([
      {
        quote_id: id,
        product_slug: product.slug,
        product_name: product.name,
        quantity
      }
    ]).select()

    setItems([...items, ...(data || [])])
  }

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
            <h2 className="text-xl font-bold mb-4">Quote Items</h2>

            <div className="flex gap-4 mb-4">
              <select onChange={(e) => setSelectedProduct(e.target.value)} className="border p-2 rounded">
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>

              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="border p-2 rounded w-24" />

              <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.id} className="border p-3 rounded">
                  {item.product_name} — Qty: {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Internal Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              rows="5"
            />
            <button
              onClick={async () => {
                await supabase.from('quotes').update({ internal_notes: notes }).eq('id', quote.id)
                alert('Saved')
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Notes
            </button>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
