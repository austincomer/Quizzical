import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import StartQuiz from './components/StartQuiz'
import Quiz from './components/Quiz'
import he from 'he'


function App() {
const [startGame, setStartGame] = useState(false)

function handleStartGame() {
  setStartGame(true)
}
  
  return (
    <div className='app-container'>
      {startGame && <Header />}
      <main>
        {startGame ? <Quiz /> : <StartQuiz handleStartGame={handleStartGame}/>}
      </main>
    </div>
  )
}

export default App
