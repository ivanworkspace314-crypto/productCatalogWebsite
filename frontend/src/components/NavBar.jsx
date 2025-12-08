import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Moon, Sun, Plus } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NavBar = () => {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-brand-600 transition hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-brand-200 dark:hover:text-brand-100"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="uppercase">Product Store</span>
        </button>

        <div className="flex items-center gap-3">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-brand-400 dark:hover:text-brand-100"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
