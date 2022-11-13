import '../index.scss'
import './index.scss'
import { MouseEventHandler } from 'react'
import { Icon } from '@iconify/react'

interface Props {
  className?: string
  children: string
  loading?: boolean
  onClick?: MouseEventHandler<any> | undefined;
}

const CContainedBtn = ({ children, className, loading, onClick }: Props) => {
  return (
    <button
      className={ 'c-btn c-contained-btn ' + className }
      onClick={ onClick }
    >
      { loading ?
        <Icon
          className="tw-w-full tw-h-full"
          icon="line-md:loading-twotone-loop"
        /> :
        children
      }
    </button>
  )
}

export default CContainedBtn
