import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AnimeApp from './Components/AnimeApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AnimeApp />
    </>
  )
}

export default App
