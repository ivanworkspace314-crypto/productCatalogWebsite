import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') return '-'
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) return value
  return `$${numberValue.toFixed(2)}`
}

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [imgError, setImgError] = useState(false)
  const { productName, price, imageURL } = product

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!imgError && imageURL ? (
          <img
            src={imageURL}
            alt={productName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 text-brand-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
            <span className="text-sm font-semibold">No image</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{productName}</p>
          <p className="text-sm text-brand-600 dark:text-brand-300">{formatPrice(price)}</p>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-brand-400"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
