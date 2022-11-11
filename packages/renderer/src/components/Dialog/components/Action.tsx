interface Props {
  children: JSX.Element
  className?: string
}

export const CDialogAction = ({ children, className }: Props) => {
  return (
    <div
      className={ 'tw-px-4 tw-py-2 tw-flex tw-items-center ' + className }
    >
      { children }
    </div>
  )
}
