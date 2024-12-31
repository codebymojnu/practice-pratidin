import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Question from "../components/quiz/Question";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizInfo from "../components/quiz/QuizInfo";
import UserAvatar from "../components/quiz/UserAvatar";
import useAxios from "../hooks/useAxios";

// {
//   "status": "success",
//   "data": {
//       "id": "3ac55a23-848d-486e-b820-d2c9a24bc62c",
//       "title": "Chemistry- Structure of Matter",
//       "description": "যদি এই ৩০ টা MCQ এর উত্তর সঠিক দিতে পারো, তাহলে বুঝবে তুমি ফাটায়া দিছো!",
//       "thumbnail": "http://localhost:5000/images/7.jpg",
//       "status": "published",
//       "stats": {
//           "total_questions": 2,
//           "total_marks": 10,
//           "total_attempts": 0,
//           "average_score": "0.00",
//           "highest_score": 0
//       },
//       "questions": [
//           {
//               "id": "b9f21e4a-16ef-4b39-abeb-d3264deb299e",
//               "question": "নিচের কোনটি সঠিক?",
//               "options": [
//                   "O₂ যৌগের অণু",
//                   "CO₂ মৌলের অণু",
//                   "অণু গঠনে কমপক্ষে দুটি পরমাণু দরকার",
//                   "সকল যৌগ অণু"
//               ],
//               "marks": 5,
//               "correctAnswer": "অণু গঠনে কমপক্ষে দুটি পরমাণু দরকার"
//           },
//           {
//               "id": "1fd2f56d-49b8-406a-ab90-007680718878",
//               "question": "26Fe³⁺ এ 3d অরবিটালে কতটি ইলেকট্রন থাকে?",
//               "options": [
//                   "6",
//                   "8",
//                   "4",
//                   "3"
//               ],
//               "marks": 5,
//               "correctAnswer": "6"
//           }
//       ],
//       "user_attempt": {
//           "attempted": false
//       }
//   }
// }

export default function QuizPage() {
  const [questionSet, setQuestionSet] = useState(null);
  const { api } = useAxios();
  const location = useLocation();
  const { quizId } = location.state || { quizId: null };

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
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
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
          <Question />
        </div>
      </div>
    </main>
  );
}
