interface Props {
  onClick: () => void
}

const StopBtn = ({ onClick }: Props) => {
  return (
    <button
      onClick={ onClick }
      className="tw-my-4 tw-bg-[#0069FF] tw-text-white hover:tw-text-red-500 tw-ring tw-ring-[#0069FF] tw-rounded-full tw-py-1 tw-px-3 tw-uppercase"
    >
      stop record
    </button>
  )
}

export default StopBtn
