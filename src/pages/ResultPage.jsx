import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QuizSummary from "../components/result/QuizSummary";
import ResultQuestions from "../components/result/ResultQuestions";
import useResultStore from "../store/resultStore";
import quizSummary from "../utils/quizSummary";
import { useAuth } from "./../hooks/useAuth";
import useAxios from "./../hooks/useAxios";

function ResultPage() {
  const location = useLocation();
  const { quizId } = location.state || {}; // State থেকে quizId পাওয়া যাচ্ছে
  const {
    auth: {
      user: { id },
    },
  } = useAuth();
  const { api } = useAxios();

  const { setResultData } = useResultStore();

  useEffect(() => {
    async function fetchAttemtData() {
      // রেজল্ভ করা বেস URL
      const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

      const response = await api.get(`${baseURL}/quizzes/${quizId}/attempts`);
      if (response.status === 200) {
        console.log("Attempt data fetched successfully:", response.data);
        setResultData(quizSummary(response?.data?.data, id));
      }
    }
    fetchAttemtData();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-google">
      <div className="flex min-h-screen overflow-hidden">
        <QuizSummary quizId={quizId} />
        <ResultQuestions quizId={quizId} />
      </div>
    </div>
  );
}

export default ResultPage;
