import { Icon } from '@iconify/react'

interface Props {
  onClick: () => void
}

const StartBtn = ({ onClick }: Props) => {
  return (
    <div
      className="tw-px-24"
    >
      <button
        onClick={ onClick }
        className="tw-w-full tw-h-full tw-ring tw-ring-[#0069FF] tw-rounded-full tw-text-[#0069FF] hover:tw-text-red-500"
      >
        <Icon
          className="tw-w-full tw-h-full"
          icon="material-symbols:play-arrow-outline-rounded"
        />
      </button>
    </div>
  )
}

export default StartBtn
