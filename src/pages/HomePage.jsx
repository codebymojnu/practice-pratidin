import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import QuizCard from "../components/QuizCard";
import UserInfo from "../components/UserInfo";
import useAxios from "../hooks/useAxios";
export default function HomePage() {
  const [quizSet, setQuizSet] = useState(null);
  const { api } = useAxios();

  useEffect(() => {
    // Fetch quiz set data from server
    async function fetchQuestionSets() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`
        );

        if (response.status === 200) {
          setQuizSet(response?.data);
        }
      } catch (error) {
        console.error("Quiz set error:", error.message);
      }
    }
    fetchQuestionSets();
  });

  return (
    <div className="container mx-auto py-3">
      <Header />
      <UserInfo />
      <Link to="/leaderboard" className="block text-center text-blue-500 mt-4">
        Leaderboard
      </Link>
      <Link to="/result" className="block text-center text-blue-500 mt-4">
        Result Page
      </Link>
      <Link to="/quiz">Quiz Page</Link>
      <main className="bg-white p-6 rounded-md h-full">
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizSet?.data?.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quizId={quiz?.id}
                title={quiz?.title}
                description={quiz?.description}
                thumbnail={quiz?.thumbnail}
                totalQuestion={quiz?.total_questions}
                isAttempted={quiz?.is_attempted}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
