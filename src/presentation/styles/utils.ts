import { defaultTheme } from './theme'

const extractRgbColors = (color: string): number[] => /\(([^)]+)\)/.exec(color)[1].split(',').slice(0, 3).map(c => parseInt(c.trim()))

const adjust = (red: number, green: number, blue: number, amount: number): string => {
  return `rgb(${Math.round(red * amount)}, ${Math.round(green * amount)}, ${Math.round(blue * amount)})`
}

export const contrast = (color: string): string => {
  const values = extractRgbColors(color)
  const sum = (values[0] * 0.299) + (values[1] * 0.587) + (values[2] * 0.114)
  return defaultTheme.colors[sum > 155 ? 'dark' : 'light'].highEmphasis
}

export const lighten = (color: string, amount: number): string => {
  const values = extractRgbColors(color)
  return `rgb(${values[0]}, ${values[1]}, ${values[2]}, ${1 - (amount / 100)})`
}

export const darken = (color: string, amount: number): string => {
  const values = extractRgbColors(color)
  return adjust(values[0], values[1], values[2], 1 - (amount / 100))
}
