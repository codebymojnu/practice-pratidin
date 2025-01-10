export default function QuestionsForResult({ questions, wrong_answers }) {
  return (
    <>
      {questions?.map((question, qIndex) => (
        <div key={qIndex}>
          <div className="bg-white p-6 !pb-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {qIndex + 1}. {question?.question}
              </h3>
            </div>
            {question?.options?.map((option, oIndex) => {
              // Check if the current option is the correct answer or a wrong answer
              const isCorrect = question?.correctAnswer === option;
              const isWrong = wrong_answers?.includes(option);

              // Assign the appropriate class based on correctness
              const optionClass = isCorrect
                ? "bg-green-100 border border-[#1DAF66] text-green-800 font-medium block w-full p-3 pl-4 rounded-lg shadow-md mb-1 flex items-center gap-2"
                : isWrong
                ? "bg-red-100 border border-[#F67676] text-red-800 font-medium block w-full p-3 pl-4 rounded-lg shadow-md mb-1 flex items-center gap-2"
                : "bg-gray-50 border border-[#737373] text-gray-800 block w-full p-3 pl-4 rounded-lg mb-1 flex items-center gap-2";

              // Icon classes
              const iconClass = isCorrect
                ? "flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full"
                : isWrong
                ? "flex items-center justify-center w-5 h-5  bg-red-600 text-white rounded-full"
                : "flex items-center justify-center w-5 h-5 border border-[#737373] rounded-full"; // Hide the icon for neutral options

              return (
                <div className="space-y-2" key={oIndex}>
                  <div className={optionClass}>
                    <span className={iconClass}>
                      {isCorrect ? "✓" : isWrong ? "✕" : ""}
                    </span>
                    <span>{option}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex space-x-4 bg-primary/10 px-6 py-2">
            <div className="flex items-center justify-center gap-1">
              <div className="h-4 w-6 bg-red-100"></div>
              <div className="text-red-600 font-small">Wrong Answer</div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="h-4 w-6 bg-green-100"></div>
              <div className="text-green-600 font-small">Correct Answer</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
