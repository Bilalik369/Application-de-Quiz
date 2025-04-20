"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

const Home = () => {
  const [playerName, setPlayerName] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Check if player name exists in localStorage
    const storedName = localStorage.getItem("quizPlayerName")
    if (storedName) {
      setPlayerName(storedName)
    }
  }, [])

  const handleStartQuiz = () => {
    if (!playerName.trim()) {
      setError("Please enter your name to start the quiz")
      return
    }

   
    localStorage.setItem("quizPlayerName", playerName)

    
    navigate("/quiz")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md shadow-lg rounded-lg bg-card">
        <Header title="Trivia Quiz" subtitle="Test your knowledge with our interactive quiz!" />
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none text-text-primary">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value)
                  setError("")
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {error && <p className="text-sm text-error">{error}</p>}
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={handleStartQuiz}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
