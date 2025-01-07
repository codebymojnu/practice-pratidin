import { useEffect, useState } from "react";
import shuffleArray from "../../utils/shuffleArray";
import { useAuth } from "./../../hooks/useAuth";
import useAxios from "./../../hooks/useAxios";
import Options from "./Options";

export default function Question({ questions = [], quizId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [participated, setParticipated] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { api } = useAxios();
  const { auth } = useAuth();

  // প্রশ্ন পরিবর্তন হলে অপশনগুলো শাফল করুন
  useEffect(() => {
    if (questions[currentIndex]?.options) {
      setShuffledOptions(shuffleArray(questions[currentIndex].options));
    }
  }, [currentIndex, questions]);

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setParticipated(participated + 1);
    } else {
      handleSubmit();
    }
  }

  // উত্তর সংগ্রহ
  function handleAnswer(questionId, selectedAnswer) {
    // উত্তর সংগ্রহ
    console.log("Answer collected:", questionId, selectedAnswer);
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  }

  // এবং সার্ভারে ইউজারের উত্তর পাঠানো

  function handleSubmit() {
    async function submitAnswers() {
      try {
        // const token = auth?.authToken;

        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempt`,
          { answers }
        );

        if (response.status === 200) {
          console.log("Answer submitted successfully:", response.data);
        }
      } catch (error) {
        console.error(
          "Error submitting answers:",
          error.response?.data || error
        );
      }
    }
    submitAnswers();
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">
          Q{currentIndex + 1}.{" "}
          {currentQuestion?.question || "No question available"}
        </h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Remaining: {questions.length - (currentIndex + 1)} | Participated:{" "}
        {participated}
      </p>
      <Options
        options={shuffledOptions}
        onNext={handleNext}
        currentIndex={currentIndex}
        questions={questions}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
