const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pt-8 pb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">
        Product Store
      </p>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
