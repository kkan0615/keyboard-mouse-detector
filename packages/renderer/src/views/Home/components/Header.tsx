import Setting from '@/views/Home/components/Setting'
import { DarkModeBtn } from '@/components/DarkModeBtn'
import { LanguageSelect } from '@/components/commons/LanguageSelect'

const Header = () => {
  return (
    <div
      className="tw-flex tw-items-center tw-px-2 tw-py-1"
    >
      <div
        className="tw-ml-auto"
      />
      <div
        className="tw-flex tw-items-center tw-space-x-2"
      >
        <LanguageSelect />
        <DarkModeBtn />
        <Setting />
      </div>
    </div>
  )
}

export default Header
