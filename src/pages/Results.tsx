"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import ProgressBar from "../components/ProgressBar"

const ResultsPage = () => {
  const [playerName, setPlayerName] = useState("")
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
   
    const storedName = localStorage.getItem("quizPlayerName")
    const storedScore = localStorage.getItem("quizScore")
    const storedTotalQuestions = localStorage.getItem("quizTotalQuestions")

    if (!storedName || !storedScore || !storedTotalQuestions) {
      
      navigate("/")
      return
    }

    setPlayerName(storedName)
    setScore(Number.parseInt(storedScore, 10))
    setTotalQuestions(Number.parseInt(storedTotalQuestions, 10))
  }, [navigate])

  const handlePlayAgain = () => {
    
    localStorage.removeItem("quizScore")
    localStorage.removeItem("quizTotalQuestions")
    navigate("/quiz")
  }

  const handleReturnHome = () => {
    navigate("/")
  }

  const scorePercentage = (score / totalQuestions) * 100

  let message = ""
  let messageColor = ""

  if (scorePercentage >= 80) {
    message = "Excellent! You're a trivia master!"
    messageColor = "text-success"
  } else if (scorePercentage >= 60) {
    message = "Good job! You know your stuff!"
    messageColor = "text-primary"
  } else if (scorePercentage >= 40) {
    message = "Not bad! Room for improvement."
    messageColor = "text-warning"
  } else {
    message = "Keep practicing! You'll get better."
    messageColor = "text-error"
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md rounded-lg bg-card shadow-lg">
        <Header title="Quiz Results" />
        <div className="p-6 space-y-4">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-warning"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>

          <div className="text-center">
            <p className="text-lg text-text-primary">
              Congratulations, <span className="font-bold">{playerName}</span>!
            </p>
            <p className={`text-xl font-semibold mt-2 ${messageColor}`}>{message}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-text-primary">Your Score:</p>
              <p className="font-bold text-text-primary">
                {score} / {totalQuestions}
              </p>
            </div>
            <ProgressBar value={scorePercentage} />
            <p className="text-sm text-right text-text-secondary">{scorePercentage.toFixed(0)}%</p>
          </div>
        </div>
        <div className="p-6 pt-0 space-y-3">
          <button
            onClick={handlePlayAgain}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6"></path>
              <path d="M2.5 12.5v-6h6"></path>
              <path d="M2.5 12.5a10 10 0 0 0 17 7.14"></path>
              <path d="M21.5 8a10 10 0 0 0-17-7.14"></path>
            </svg>
            Play Again
          </button>
          <button
            onClick={handleReturnHome}
            className="w-full py-2 px-4 border border-gray-300 text-text-primary rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Return Home
          </button>
        </div>
      </div>
    </main>
  )
}

export default ResultsPage
