import '../index.scss'
import './index.scss'
import { MouseEventHandler } from 'react'

interface Props {
  className?: string
  children: string
  onClick?: MouseEventHandler<any> | undefined;
}

const CContainedBtn = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={ 'c-btn c-contained-btn ' + className }
      onClick={ onClick }
    >
      { children }
    </button>
  )
}

export default CContainedBtn
