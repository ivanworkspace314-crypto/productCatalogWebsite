export const isValidUrl = (value) => {
  if (!value) return false
  try {
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  } catch (err) {
    return false
  }
}

export const isValidPrice = (value) => {
  if (value === undefined || value === null || value === '') return false
  const num = Number(value)
  return Number.isFinite(num)
}
