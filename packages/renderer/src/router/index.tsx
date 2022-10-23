import {
  createHashRouter,
} from 'react-router-dom'
import App from '@/App'
import Home from '@/views/Home'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        index: true,
      }
    ],
  }
])


export default router
