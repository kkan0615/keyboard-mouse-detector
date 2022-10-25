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
        className="tw-grow"
      >
        <Outlet />
      </div>
    </div>
  )
}

export default App
