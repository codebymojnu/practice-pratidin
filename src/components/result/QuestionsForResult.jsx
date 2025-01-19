import RenderContent from "./RenderContent";

export default function QuestionsForResult({ questions, wrong_answers }) {
  return (
    <div className="space-y-6 px-4 py-6 bg-gray-100 min-h-screen">
      {questions?.map((question, qIndex) => (
        <div
          key={qIndex}
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Question Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-start gap-2">
              <span>{qIndex + 1}.</span>
              <RenderContent content={question?.question} />
            </h3>
          </div>

          {/* Options Section */}
          <div className="p-4 space-y-3">
            {question?.options?.map((option, oIndex) => {
              const isCorrect = question?.correctAnswer === option;
              const isWrong = wrong_answers?.includes(option);

              const optionClass = isCorrect
                ? "bg-green-50 border border-green-400 text-green-800"
                : isWrong
                ? "bg-red-50 border border-red-400 text-red-800"
                : "bg-gray-50 border border-gray-300 text-gray-800";

              return (
                <div
                  key={oIndex}
                  className={`${optionClass} flex items-center gap-3 p-3 rounded-lg shadow-sm`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 text-white rounded-full ${
                      isCorrect
                        ? "bg-green-500"
                        : isWrong
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {isCorrect ? "✓" : isWrong ? "✕" : ""}
                  </span>
                  <span className="text-sm">
                    <RenderContent content={option} />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Answer Legend */}
          <div className="flex justify-between items-center bg-gray-50 p-3 text-sm border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-green-600">Correct Answer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-red-600">Wrong Answer</span>
            </div>
          </div>

          {/* Explanation Section */}
          <details className="p-4 bg-gray-50">
            <summary className="text-sm font-medium text-blue-600 cursor-pointer">
              ব্যাখ্যা
            </summary>
            <div className="mt-2 text-sm text-gray-700">
              <RenderContent content={question?.explanation} />
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
