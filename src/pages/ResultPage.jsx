import QuizSummary from "../components/result/QuizSummary";
import ResultQuestions from "../components/result/ResultQuestions";

function ResultPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <QuizSummary />
        <ResultQuestions />
      </div>
    </div>
  );
}

export default ResultPage;
