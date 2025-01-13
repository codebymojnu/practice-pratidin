import { useEffect, useState } from "react";
import NextButton from "./NextButton";
import Option from "./Option";

export default function Options({
  options = [],
  onNext,
  onPrevious,
  currentIndex,
  questions,
  onAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track answers for each question

  useEffect(() => {
    // Load the selected answer if the question was already answered
    const currentQuestionId = questions[currentIndex]?.id;
    setSelectedOption(answeredQuestions[currentQuestionId] || null);
  }, [currentIndex, answeredQuestions, questions]);

  function handleOptionSelect(option) {
    const currentQuestionId = questions[currentIndex]?.id;

    if (!answeredQuestions[currentQuestionId]) {
      setSelectedOption(option); // Set the selected option
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestionId]: option, // Save the answer for the current question
      }));
      onAnswer(currentQuestionId, option); // Send the answer to the parent
    }
  }

  const isAnswered = !!answeredQuestions[questions[currentIndex]?.id];

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Option
            key={index}
            name={option}
            option={option}
            isDisabled={isAnswered} // Disable if the question is already answered
            isSelected={selectedOption === option} // Set checked state
            onSelect={() => handleOptionSelect(option)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        {currentIndex > 0 && (
          <button
            onClick={onPrevious}
            className="w-1/3 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
          >
            Previous
          </button>
        )}

        <NextButton
          onNext={() => {
            setSelectedOption(null); // Reset selected option when moving to the next question
            onNext();
          }}
          currentIndex={currentIndex}
          totalQ={questions?.length}
        />
      </div>
    </>
  );
}
