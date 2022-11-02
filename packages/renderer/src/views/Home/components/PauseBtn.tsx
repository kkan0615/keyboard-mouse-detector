import { Icon } from '@iconify/react'

interface Props {
  onClick: () => void
}

const PauseBtn = ({ onClick }: Props) => {
  return (
    <div
      className="tw-px-24"
    >
      <button
        onClick={ onClick }
        className="tw-w-full tw-h-full tw-p-7
        tw-ring tw-ring-primary
        tw-rounded-full
        tw-text-primary
        tw-transition tw-delay-150 tw-duration-150 tw-ease-out hover:tw-ease-in
        hover:tw-text-red-500 hover:tw-ring-red-500"
      >
        <Icon
          className="tw-w-full tw-h-full"
          icon="material-symbols:pause-rounded"
        />
      </button>
    </div>
  )
}

export default PauseBtn
