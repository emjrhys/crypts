export default ({ app }, inject) => {
  const formatNumber = (value) => {
    if (isNaN(value)) return null

    if (value >= 10000) { // Scientific notation
      const exponent = Math.floor(value / 10)
      const normalizedNumber = value / Math.pow(10, exponent)
      return `${normalizedNumber.toFixed(2)}e${exponent}`
    }
      
    return value.toFixed(2)
  }

  const formatCurrency = (value) => {
    if (value < 0)
      return `-$${formatNumber(Math.abs(value))}`
    else
      return `$${formatNumber(value)}`
  }

  inject('formatNumber', formatNumber)
  inject('formatCurrency', formatCurrency)
}