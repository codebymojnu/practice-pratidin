import { useEffect, useState } from "react";
import useResultStore from "../../store/resultStore";
import useAxios from "./../../hooks/useAxios";
import QuestionsForResult from "./QuestionsForResult";

export default function ResultQuestions({ quizId }) {
  const [questionSet, setQuestionSet] = useState(null);
  const { api } = useAxios();
  const { resultData } = useResultStore();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        // রেজল্ভ করা বেস URL
        const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

        // সঠিক API রিকোয়েস্ট URL তৈরি
        const response = await api.get(`${baseURL}/quizzes/${quizId}`);
        if (response.status === 200) {
          console.log("Quiz data:", response?.data);
          setQuestionSet(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }
    fetchQuiz();
  }, [quizId]);

  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
        <div className="px-4">
          <div className="rounded-lg overflow-hidden shadow-sm mb-4">
            <QuestionsForResult
              questions={questionSet?.questions}
              wrong_answers={resultData?.wrongAnswersArray}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
