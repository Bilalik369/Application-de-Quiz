

import type { Question } from "../types"

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  isAnswerCorrect: boolean | null
  onAnswerSelect: (answer: string) => void
}

const QuestionCard = ({ question, selectedAnswer, isAnswerCorrect, onAnswerSelect }: QuestionCardProps) => {

  const allAnswers = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)

  return (
    <div className="p-6 pt-0">
      <h2
        className="text-xl font-medium mb-4 text-text-primary"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <div className="grid gap-3">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => !selectedAnswer && onAnswerSelect(answer)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg text-left transition-colors ${
              selectedAnswer === answer
                ? isAnswerCorrect
                  ? "bg-success bg-opacity-10 border-success border text-text-primary"
                  : "bg-error bg-opacity-10 border-error border text-text-primary"
                : selectedAnswer !== null && answer === question.correct_answer
                  ? "bg-success bg-opacity-10 border-success border text-text-primary"
                  : "bg-card border hover:border-secondary hover:bg-secondary hover:bg-opacity-5 text-text-primary"
            }`}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
