import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import PageHeader from '../components/PageHeader'
import { createProduct } from '../api/products'
import { isValidPrice, isValidUrl } from '../utils/validation'

const CreatePage = () => {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!productName.trim()) {
      setError('Product name is required')
      return
    }
    if (!isValidPrice(price)) {
      setError('Price must be a valid number')
      return
    }
    if (!isValidUrl(imageURL)) {
      setError('Image URL must be a valid URL')
      return
    }

    setError('')
    setSubmitting(true)
    try {
      await createProduct({ productName: productName.trim(), price: Number(price), imageURL })
      navigate('/')
    } catch (err) {
      setError('Failed to create product. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <PageHeader
        title="Create New Product"
        subtitle="Add product details below and submit to include it in the catalog."
      />

      <main className="mx-auto max-w-3xl px-4 pb-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="name">
              Product Name
            </label>
            <input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Wireless Headphones"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://images.example.com/product.jpg"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-brand-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreatePage
