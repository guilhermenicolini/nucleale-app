import { FC } from 'react'
import { DangerIcon, WarningIcon, SuccessIcon, InfoIcon } from '@/presentation/components/icons'

export interface AlertIconProps {
  color: 'danger' | 'warning' | 'success' | 'info'
}

export const AlertIcon: FC<AlertIconProps> = (props: AlertIconProps) => {
  const icons = {
    danger: <DangerIcon />,
    warning: <WarningIcon />,
    success: <SuccessIcon />,
    info: <InfoIcon />
  }
  return icons[props.color]
}
