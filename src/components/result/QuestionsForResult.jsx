export default function QuestionsForResult({ questions }) {
  console.log(questions);
  return (
    <>
      {questions?.map((question, index) => (
        <div key={index}>
          <div className="bg-white p-6 !pb-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {index + 1}. {question?.question}
              </h3>
            </div>
            {question?.options?.map((option, index) => (
              <div className="space-y-2" key={index}>
                <div className="flex items-center space-x-3">
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 bg-primary/10 px-6 py-2">
            <div className="flex items-center justify-center gap-1">
              <div className="h-4 w-6 bg-red-600"></div>
              <div className="text-red-600 font-medium">Wrong Answer</div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="h-4 w-6 bg-green-500"></div>
              <div className="text-green-600 font-medium">Right Answer</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
