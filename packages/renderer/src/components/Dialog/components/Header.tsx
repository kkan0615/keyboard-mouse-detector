interface Props {
  children: JSX.Element
  className?: string
}

export const CDialogHeader = ({ children, className }: Props) => {
  return (
    <div
      className={ 'tw-px-4 tw-py-3 tw-flex tw-items-center ' + className }
    >
      { children }
    </div>
  )
}
