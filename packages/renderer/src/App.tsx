import './App.css'
import { Outlet } from 'react-router'
const App = () => {
  return (
    <div
      className="tw-flex tw-flex-col tw-h-screen"
    >
      <div
        className="tw-shrink"
      >
        System Menu bar
      </div>
      <div
        className="tw-grow tw-h-1"
      >
        <Outlet />
      </div>
    </div>
  )
}

export default App
