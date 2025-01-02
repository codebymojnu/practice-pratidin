import { useEffect, useState } from "react";
import shuffleArray from "../../utils/shuffleArray";
import NextButton from "./NextButton";
import Options from "./Options";

export default function Question({ questions = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [participated, setParticipated] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (questions[currentIndex]?.options) {
      // প্রশ্ন পরিবর্তন হলে অপশনগুলো শাফল করুন
      setShuffledOptions(shuffleArray(questions[currentIndex].options));
    }
  }, [currentIndex, questions]);

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setParticipated(participated + 1);
    } else {
      console.log("Quiz completed");
    }
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
      <Options options={shuffledOptions} />
      <NextButton
        onNext={handleNext}
        currentIndex={currentIndex}
        totalQ={questions?.length}
      />
    </div>
  );
}
