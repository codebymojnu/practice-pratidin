import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shuffleArray from "../../utils/shuffleArray";
import RenderContent from "../result/RenderContent";
import useAxios from "./../../hooks/useAxios";
import Options from "./Options";

export default function Question({
  questions = [],
  quizId,
  timeLeft,
  setTimeLeft,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [participated, setParticipated] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { api } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (questions[currentIndex]?.options) {
      setShuffledOptions(shuffleArray(questions[currentIndex].options));
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setParticipated(participated + 1);
    } else {
      handleSubmit();
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setParticipated(participated - 1);
    }
  }

  function handleAnswer(questionId, selectedAnswer) {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  }

  async function handleSubmit() {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempt`,
        { answers }
      );

      if (response.status === 200) {
        navigate("/result", { state: { quizId } });
      }
    } catch (error) {
      console.error("Error submitting answers:", error.response?.data || error);
    }
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-white p-6 rounded-md font-google">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-start gap-2">
          <span>{currentIndex + 1}.</span>
          <RenderContent content={currentQuestion?.question} />
        </h3>
      </div>
      <p className="inline-block font-medium px-4 py-2 text-gray-500 mb-4 border border-gray-400">
        Remaining: {questions.length - (currentIndex + 1)} | Participated:{" "}
        {participated} |{" "}
        <span className="inline-flex items-center py-2  text-base font-medium rounded-md text-red-600">
          সময় বাকি আছে: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </span>
      </p>
      <Options
        options={shuffledOptions}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={currentIndex}
        questions={questions}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
