import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.addEventListener('keypress', keyPress)
    return () => {
      document.removeEventListener('keypress', keyPress)
    }
  }, [])

  const keyPress = (event: KeyboardEvent) => {
    console.log(event)
  }
  return (
    <div>
      Home
    </div>
  )
}

export default Home
