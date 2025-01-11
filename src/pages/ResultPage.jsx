import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import QuizSummary from "../components/result/QuizSummary";
import ResultQuestions from "../components/result/ResultQuestions";
import useResultStore from "../store/resultStore";
import quizSummary from "../utils/quizSummary";
import { useAuth } from "./../hooks/useAuth";
import useAxios from "./../hooks/useAxios";

function ResultPage() {
  const [loading, setLoading] = useState(true);
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
      try {
        const response = await api.get(`${baseURL}/quizzes/${quizId}/attempts`);
        if (response.status === 200) {
          console.log("Attempt data fetched successfully:", response.data);
          setLoading(false);
          setResultData(quizSummary(response?.data?.data, id));
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
    fetchAttemtData();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-google">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClockLoader size={50} color="#000000" />
        </div>
      ) : (
        <div className="flex min-h-screen overflow-hidden">
          <QuizSummary quizId={quizId} />
          <ResultQuestions quizId={quizId} />
        </div>
      )}
    </div>
  );
}

export default ResultPage;
