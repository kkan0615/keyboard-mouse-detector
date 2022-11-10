interface Props {
  children: JSX.Element
  className?: string
}

export const CDialogContent = ({ children, className }: Props) => {
  return (
    <div
      className={ 'tw-px-4 tw-py-4 ' + className }
    >
      { children }
    </div>
  )
}
