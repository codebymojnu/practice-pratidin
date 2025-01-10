export default function quizSummary(resultData, userId) {
    let correct_answer = 0;
    let wrong_answer = 0;
    let total_marks = 0;
    let user_marks = 0;
    let correct_answers_array = [];
    let wrong_answers_array = [];

    const userAttempt = resultData?.attempts?.find((attempt) => attempt?.user?.id === userId);
    const { correct_answers = [], submitted_answers = [] } = userAttempt;

    console.log(correct_answers, submitted_answers);

    // Iterate through correct answers
    for (let i = 0; i < correct_answers.length; i++) {
        const correctAnswer = correct_answers[i];
        const submittedAnswer = submitted_answers.find(
            (submitted) => submitted.question_id === correctAnswer.question_id
        );

        total_marks += correctAnswer.marks; // Add the marks for each question to total_marks

        if (submittedAnswer) {
            if (submittedAnswer.answer === correctAnswer.answer) {
                // If the answer matches, it's correct
                correct_answer++;
                user_marks += correctAnswer.marks;
                correct_answers_array.push(correctAnswer.answer);
            } else {
                // If the answer doesn't match, it's wrong
                wrong_answer++;
                wrong_answers_array.push(submittedAnswer.answer);
            }
        } else {
            // If there's no submitted answer, count as wrong
            wrong_answer++;
        }
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
        correctAnswersArray: correct_answers_array,
        wrongAnswersArray: wrong_answers_array,
    };
}
