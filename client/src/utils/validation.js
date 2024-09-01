
export function validateQuiz(quiz) {
    // Check if there is at least one question
    if (!quiz.questions || quiz.questions.length === 0) {
        return "The quiz must contain at least one question";
    }

    // Validate each question
    for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];

        // Check if the question text is not empty
        if (!question.question || question.question.trim() === "") {
            return `Question ${i + 1} has an empty question text`;
        }

        // Check if there is at least one option
        if (!question.options || question.options.length < 2) {
            return `Question ${i + 1} must contain at least two options`;
        }

        // Validate each option
        for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];

            // Check if the option text is not empty
            if (!option.text || option.text.trim() === "") {
                return `Question ${i + 1}, Option ${j + 1} has an empty text`;
            }
        }

        // Check if the answer index is valid
        if (question.answer == null || question.answer < 0 || question.answer >= question.options.length) {
            return `Question ${i + 1} has an invalid answer index`;
        }
    }

    // If all validations pass
    return "valid";
}