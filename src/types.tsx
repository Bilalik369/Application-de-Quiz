export interface Question {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }
  
  export interface QuizState {
    playerName: string
    questions: Question[]
    currentQuestionIndex: number
    selectedAnswer: string | null
    score: number
  }
  