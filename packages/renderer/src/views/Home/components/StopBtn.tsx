import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

interface Props {
  loading: boolean
  onClick: () => void
}

const StopBtn = ({ loading, onClick }: Props) => {
  const { t } = useTranslation()

  return (
    <button
      onClick={ onClick }
      className="tw-mt-4 tw-mb-2 tw-py-1 tw-px-3
      tw-bg-primary tw-text-white hover:tw-text-red-500
      tw-ring tw-ring-primary
      tw-rounded-full
      tw-uppercase"
    >
      { loading ?
        <Icon
          className="tw-w-full tw-h-full"
          icon="line-md:loading-twotone-loop"
        /> :
        t('commons.buttons.stop')
      }
    </button>
  )
}

export default StopBtn
