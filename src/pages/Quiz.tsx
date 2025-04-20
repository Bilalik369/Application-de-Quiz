

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import ProgressBar from "../components/ProgressBar"
import QuestionCard from "../components/QuestionCard"
import { fetchQuizQuestions } from "../services/triviaApi"
import type { Question } from "../types";

const Quiz = () => {
  const [playerName, setPlayerName] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    
    const storedName = localStorage.getItem("quizPlayerName")
    if (!storedName) {
      
      navigate("/")
      return
    }

    setPlayerName(storedName)

    
    const loadQuestions = async () => {
      try {
        const data = await fetchQuizQuestions()
        setQuestions(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
        setLoading(false)
      }
    }

    loadQuestions()
  }, [navigate])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answer === currentQuestion.correct_answer

    setIsAnswerCorrect(isCorrect)
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    } else {
      // Save score to localStorage
      localStorage.setItem("quizScore", score.toString())
      localStorage.setItem("quizTotalQuestions", questions.length.toString())

      // Navigate to results page
      navigate("/results")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-text-secondary">Loading questions...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md rounded-lg bg-card shadow-lg">
          <Header title="Error" />
          <div className="p-6">
            <p className="text-center text-text-primary">Failed to load questions. Please try again later.</p>
          </div>
          <div className="p-6 pt-0 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl rounded-lg bg-card shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-text-secondary">
              Playing as: <span className="font-semibold text-text-primary">{playerName}</span>
            </p>
            <p className="text-sm text-text-secondary">
              Score: <span className="font-semibold text-text-primary">{score}</span>/{currentQuestionIndex + 1}
            </p>
          </div>
          <ProgressBar value={progressPercentage} />
          <p className="text-xs text-text-secondary mt-1">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isAnswerCorrect={isAnswerCorrect}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="p-6 flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
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
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}

export default Quiz
