import { useEffect, useRef, useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  children: JSX.Element
  className?: string
}

export const CDialog = ({ open, children, className, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close()
  }, [ open ])

  return (
    <dialog
      className={ 'tw-p-0 tw-rounded ' + className }
      ref={ dialogRef }
      onClose={ onClose }
    >
      { children }
    </dialog>
  )
}
