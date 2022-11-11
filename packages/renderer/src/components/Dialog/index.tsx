import { MouseEvent, useEffect, useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  children: JSX.Element
  className?: string
}

export const CDialog = ({ open, children, className, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    // Open modal
    open ? dialogRef.current?.showModal() : dialogRef.current?.close()
  }, [ open ])

  const preventClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return (
    <dialog
      onClick={ onClose }
      className={ 'tw-p-0 tw-rounded ' + className }
      ref={ dialogRef }
      onClose={ onClose }
    >
      <div
        onClick={ preventClose }
      >
        { children }
      </div>
    </dialog>
  )
}
