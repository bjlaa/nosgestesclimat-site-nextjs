type Props = {
  question: string
  relevantQuestions: string[]
  addFoldedStep: (question: string) => void
}

function foldEveryQuestionsUntil({
  question,
  relevantQuestions,
  addFoldedStep,
}: Props) {
  const indexOfQuestion = relevantQuestions.indexOf(question)
  const questionsToAnswer = relevantQuestions.slice(0, indexOfQuestion)
  questionsToAnswer.map((question) => addFoldedStep(question))
}

export default foldEveryQuestionsUntil
