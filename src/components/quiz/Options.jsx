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
  const [selectedOption, setSelectedOption] = useState(null); // সিলেক্টেড অপশন ট্র্যাক করবে

  function handleOptionSelect(option) {
    setSelectedOption(option); // সিলেক্টেড অপশন সেট করা
    onAnswer(questions[currentIndex]?.id, option); // প্যারেন্টে উত্তর পাঠানো
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Option
            key={index}
            name={option}
            option={option}
            isDisabled={!!selectedOption} // একবার সিলেক্ট হলে বাকিগুলো নিষ্ক্রিয়
            isSelected={selectedOption === option} // চেকড স্টেট
            onSelect={() => handleOptionSelect(option)}
          />
        ))}
      </div>
      <NextButton
        onNext={() => {
          setSelectedOption(null); // নতুন প্রশ্নে যাওয়ার সময় রিসেট
          onNext();
        }}
        currentIndex={currentIndex}
        totalQ={questions?.length}
      />
    </>
  );
}
