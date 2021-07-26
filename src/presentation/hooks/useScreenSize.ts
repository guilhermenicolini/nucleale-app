import React from 'react'
import { defaultTheme } from '@/presentation/styles/theme'

type MediaType = 'mobile' | 'desktop'

export const useScreenSize = (): MediaType => {
  const getMediaType = (width: number): MediaType => {
    return width <= defaultTheme.breakPoint.mobile ? 'mobile' : 'desktop'
  }

  const [screen, setScreen] = React.useState<MediaType>(() => getMediaType(window.innerWidth))

  React.useEffect(() => {
    const onResize = (): void => {
      setScreen(getMediaType(window.innerWidth))
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return screen
}
