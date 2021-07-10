import { FC } from 'react'
import { defaultTheme } from '@/presentation/styles/theme'

export const SearchIcon: FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.4 14.4C11.9346 14.4 14.8 11.5346 14.8 7.99997C14.8 4.46535 11.9346 1.59998 8.4 1.59998C4.86538 1.59998 2 4.46535 2 7.99997C2 11.5346 4.86538 14.4 8.4 14.4Z"
        stroke={defaultTheme.colors.palette.placeHolder}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"/>
      <path
        d="M12.8916 12.8916L18.2 18.2"
        stroke={defaultTheme.colors.palette.placeHolder}
        strokeWidth="4"
        strokeMiterlimit="10"/>
    </svg>
  )
}
