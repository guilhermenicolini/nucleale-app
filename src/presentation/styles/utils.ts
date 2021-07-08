const adjust = (color: string, amount: number): string => {
  return '#' + color.replace(/^#/, '').replace(/../g, color =>
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2))
}

export const lighten = (color: string, amount: number): string => adjust(color, amount)
export const darken = (color: string, amount: number): string => adjust(color, -1 * amount)
