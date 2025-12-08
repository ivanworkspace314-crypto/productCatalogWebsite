import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { isValidPrice, isValidUrl } from '../utils/validation'

const EditModal = ({ product, onClose, onSubmit }) => {
  const [productName, setProductName] = useState(product?.productName || '')
  const [price, setPrice] = useState(product?.price || '')
  const [imageURL, setImageURL] = useState(product?.imageURL || '')
  const [error, setError] = useState('')

  useEffect(() => {
    setProductName(product?.productName || '')
    setPrice(product?.price || '')
    setImageURL(product?.imageURL || '')
  }, [product])

  const handleSubmit = (e) => {
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
    onSubmit({ productName: productName.trim(), price: Number(price), imageURL })
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Close edit modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">Modal</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Update product</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Edit the fields below and click update to save changes.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="edit-name">
              Product name
            </label>
            <input
              id="edit-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="edit-price">
              Price
            </label>
            <input
              id="edit-price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="edit-image">
              Image URL
            </label>
            <input
              id="edit-image"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              placeholder="https://..."
            />
          </div>

          {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-brand-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
