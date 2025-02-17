import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import Question from "../components/quiz/Question";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizInfo from "../components/quiz/QuizInfo";
import UserAvatar from "../components/quiz/UserAvatar";
import useAxios from "../hooks/useAxios";

export default function QuizPage() {
  const [questionSet, setQuestionSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const { api } = useAxios();
  const location = useLocation();
  const { quizId } = location.state || { quizId: null };

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
        const response = await api.get(`${baseURL}/quizzes/${quizId}`);
        if (response.status === 200) {
          setLoading(false);
          setQuestionSet(response?.data?.data);
          const totalQuestions = response?.data?.data?.questions?.length || 0;
          setTimeLeft(totalQuestions * 60); // 1 minute per question
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)] font-google">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClockLoader size={50} color="#000000" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
            <QuizHeader
              title={questionSet?.title}
              description={questionSet?.description}
            />
            <QuizInfo totalQuestion={questionSet?.stats?.total_questions} />
            <UserAvatar />
          </div>
          <div className="lg:col-span-2 bg-white">
            <Question
              questions={questionSet?.questions}
              quizId={quizId}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
            />
          </div>
        </div>
      )}
    </main>
  );
}
