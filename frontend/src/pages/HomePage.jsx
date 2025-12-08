import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EditModal from '../components/EditModal'
import NavBar from '../components/NavBar'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { deleteProduct, fetchProducts, updateProduct } from '../api/products'

const getProductId = (product) => product?._id || product?.id || product?.pid

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchProducts()
        const list = Array.isArray(data) ? data : data?.products || []
        setProducts(list)
      } catch (err) {
        setError('Unable to load products right now. Please try again soon.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const productList = useMemo(() => products || [], [products])

  const handleDelete = async (product) => {
    const id = getProductId(product)
    if (!id) {
      setError('Cannot delete product without an id')
      return
    }
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((item) => getProductId(item) !== id))
    } catch (err) {
      setError('Failed to delete product. Please retry.')
    }
  }

  const handleOpenEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleUpdate = async (payload) => {
    if (!editingProduct) return
    const id = getProductId(editingProduct)
    if (!id) {
      setError('Cannot update product without an id')
      return
    }
    try {
      const { data } = await updateProduct(id, payload)
      setProducts((prev) =>
        prev.map((item) =>
          getProductId(item) === id ? { ...item, ...payload, ...(data || {}) } : item,
        ),
      )
      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (err) {
      setError('Failed to update product. Please retry.')
    }
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <PageHeader
        title="Current Product"
        subtitle="Browse and manage the products currently available in the store."
      />

      <main className="mx-auto max-w-6xl px-4 pb-12">
        {error ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : productList.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productList.map((product) => (
              <ProductCard
                key={getProductId(product) || product.productName}
                product={product}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">No products yet</p>
            <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
              Add your first product to populate the catalog. You can always edit or delete products later.
            </p>
            <Link
              to="/create"
              className="mt-5 inline-flex items-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              Add Product
            </Link>
          </div>
        )}
      </main>

      {isModalOpen && editingProduct ? (
        <EditModal
          product={editingProduct}
          onClose={() => {
            setIsModalOpen(false)
            setEditingProduct(null)
          }}
          onSubmit={handleUpdate}
        />
      ) : null}
    </div>
  )
}

export default HomePage
