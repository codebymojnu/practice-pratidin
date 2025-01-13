import { useState } from "react";
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

  function handleOptionSelect(option) {
    setSelectedOption(option); // Set the selected option
    onAnswer(questions[currentIndex]?.id, option); // Send the answer to the parent
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Option
            key={index}
            name={option}
            option={option}
            isDisabled={!!selectedOption} // Disable once an option is selected
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
            setSelectedOption(null); // Reset when moving to the next question
            onNext();
          }}
          currentIndex={currentIndex}
          totalQ={questions?.length}
        />
      </div>
    </>
  );
}
