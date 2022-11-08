import './App.css'
import { Outlet } from 'react-router'
import { useElectron } from '@/hooks/electron'
const App = () => {
  const { dark } = useElectron()

  return (
    <div
      className="tw-flex tw-flex-col tw-h-screen"
    >
      { /* <div*/ }
      { /*  className="tw-shrink"*/ }
      { /* >*/ }
      { /*  System Menu bar*/ }
      { /* </div>*/ }
      <div
        className="tw-grow tw-h-1"
      >
        <Outlet />
      </div>
    </div>
  )
}

export default App
