import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PollForm from './components/PollForm'
import PollList from './components/PollList'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <PollForm/>
  <PollList/>
  </>
  )
}

export default App
