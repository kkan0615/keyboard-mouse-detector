import Setting from '@/views/Home/components/Setting'
import { DarkModeBtn } from '@/components/DarkModeBtn'

const Header = () => {
  return (
    <div
      className="tw-flex tw-items-center tw-px-2 tw-py-1"
    >
      <div>
        Header
      </div>
      <div
        className="tw-ml-auto"
      />
      <DarkModeBtn />
      <Setting />
    </div>
  )
}

export default Header
