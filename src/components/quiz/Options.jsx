import { useState } from "react";
import NextButton from "./NextButton";
import Option from "./Option";

export default function Options({
  options = [],
  onNext,
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

      <NextButton
        onNext={() => {
          setSelectedOption(null); // Reset when moving to the next question
          onNext();
        }}
        currentIndex={currentIndex}
        totalQ={questions?.length}
      />
    </>
  );
}
