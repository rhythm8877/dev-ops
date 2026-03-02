import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <p>Welcome to DevOps Task Manager</p>
    </div>
  )
}

export default App
