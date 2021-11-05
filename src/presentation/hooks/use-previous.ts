import React, { useEffect, useRef, MutableRefObject } from 'react'

export const usePrevious = (value: any): MutableRefObject<any> => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
