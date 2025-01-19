import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import QuizSummary from "../components/result/QuizSummary";
import QuizSummaryMobile from "../components/result/QuizSummaryMobile";
import ResultQuestions from "../components/result/ResultQuestions";
import useResultStore from "../store/resultStore";
import quizSummary from "../utils/quizSummary";
import { useAuth } from "./../hooks/useAuth";
import useAxios from "./../hooks/useAxios";

function ResultPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { quizId } = location.state || {};
  const {
    auth: {
      user: { id },
    },
  } = useAuth();
  const { api } = useAxios();
  const { setResultData } = useResultStore();

  useEffect(() => {
    async function fetchAttemptData() {
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
    fetchAttemptData();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-google">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClockLoader size={50} color="#000000" />
        </div>
      ) : (
        <>
          {/* Mobile-specific Quiz Summary */}
          <div className="flex flex-col lg:hidden ">
            <QuizSummaryMobile quizId={quizId} />
          </div>

          <div className="flex min-h-screen overflow-hidden">
            <QuizSummary quizId={quizId} />

            {/* Result Questions (Visible on all screen sizes) */}
            <ResultQuestions quizId={quizId} />
          </div>
        </>
      )}
    </div>
  );
}

export default ResultPage;
