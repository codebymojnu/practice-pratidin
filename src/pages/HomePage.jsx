import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import QuizCard from "../components/QuizCard";
import UserInfo from "../components/UserInfo";
import useAxios from "../hooks/useAxios";

export default function HomePage() {
  const [quizSet, setQuizSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    async function fetchQuestionSets() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`
        );
        console.log("API Response in HomePage:", response?.data);

        if (response.status === 200) {
          setLoading(false);
          setQuizSet(response?.data); // Ensure this matches the API structure
        }
      } catch (error) {
        console.error("Quiz set error:", error.message);
        setLoading(false);
      }
    }
    fetchQuestionSets();
  }, []);

  return (
    <div className="container mx-auto py-3 font-google">
      <Header />
      <UserInfo />
      <main className="bg-white p-6 rounded-md h-full">
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
          {loading ? (
            <div className="flex justify-center items-center">
              <ClockLoader size={50} color="#000000" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quizSet?.data?.length > 0 ? (
                quizSet?.data?.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quizId={quiz?.id}
                    title={quiz?.title}
                    description={quiz?.description}
                    thumbnail={quiz?.thumbnail}
                    totalQuestion={quiz?.total_questions}
                    isAttempted={quiz?.is_attempted}
                  />
                ))
              ) : (
                <p>No quizzes available. Please try again later.</p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
