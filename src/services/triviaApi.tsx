import type { Question } from "../types"

export async function fetchQuizQuestions(amount = 10, difficulty = "medium", type = "multiple"): Promise<Question[]> {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (data.response_code !== 0) {
      throw new Error(`API returned error code: ${data.response_code}`)
    }

    return data.results
  } catch (error) {
    console.error("Error fetching quiz questions:", error)
    throw error
  }
}
