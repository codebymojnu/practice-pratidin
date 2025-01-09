export default function quizSummary(resultData, userId) {
    let correct_answer = 0;
    let wrong_answer = 0;
    let total_marks = 0;
    let user_marks = 0;

    const userAttempt = resultData?.attempts?.find(attempt => attempt?.user?.id === userId);
    const { correct_answers = [], submitted_answers = [] } = userAttempt;

    console.log(correct_answers, submitted_answers);

    // Iterate through correct answers
    for (let i = 0; i < correct_answers.length; i++) {
        let isCorrect = false; // Flag to check if the current answer is correct

        // Loop through submitted answers
        for (let j = 0; j < submitted_answers.length; j++) {
            // Compare correct answer with submitted answer
            if (correct_answers[i].question_id === submitted_answers[j].question_id) {
                if (correct_answers[i].answer === submitted_answers[j].answer) {
                    // If the answer matches, it's correct
                    correct_answer++;
                    user_marks += correct_answers[i].marks;
                    isCorrect = true;
                }
                break; // No need to check further once a match is found
            }
        }

        // If the answer is not correct and no match was found, it's wrong
        if (!isCorrect) {
            wrong_answer++;
        }

        // Add the marks of the question to total_marks regardless of correctness
        total_marks += correct_answers[i].marks;
    }

    return {
        quizTitle: resultData.quiz?.title || "Unknown Quiz",
        quizDescription: resultData.quiz?.description || "No Description",
        totalQuestions: resultData.quiz?.total_questions || "0",
        correctAnswer: correct_answer,
        wrongAnswer: wrong_answer,
        userMarks: user_marks,
        totalMarks: total_marks,
        percentage: total_marks > 0 ? ((user_marks / total_marks) * 100).toFixed(1) : 0,
    };
}
