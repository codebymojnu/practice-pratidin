import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import LeaderBoardLeft from "../components/leaderBoard/LeaderBoardLeft";
import LeaderBoardRight from "../components/leaderBoard/LeaderBoardRight";
import useAxios from "../hooks/useAxios";

function LeaderboardPage() {
  const [leaderBoardData, setLeaderBoardData] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { quizId } = location.state || {}; // State থেকে quizId পাওয়া যাচ্ছে
  const { api } = useAxios();

  const attempts = leaderBoardData?.attempts;
  const quizData = leaderBoardData?.quiz;

  const userMarkInfo = attempts
    ?.map((attempt) => {
      const submitted_answers = attempt?.submitted_answers;
      const correct_answers = attempt?.correct_answers;

      const userCorrectAnswers = correct_answers.filter((correctAnswer) => {
        const submittedAnswer = submitted_answers.find(
          (sa) => sa?.question_id === correctAnswer?.question_id
        );
        return (
          submittedAnswer && correctAnswer.answer === submittedAnswer.answer
        );
      });

      const userTotalMark = userCorrectAnswers.reduce((total, currentValue) => {
        return total + currentValue?.marks;
      }, 0);

      const totalCorrect = userCorrectAnswers.length;

      const totalWrong = submitted_answers.length - totalCorrect; // Wrong answers = Total submitted - Correct answers

      return {
        user: attempt?.user,
        totalMark: userTotalMark,
        totalCorrect,
        totalWrong,
      };
    })
    ?.sort((a, b) => b.totalMark - a.totalMark) // Sort by total marks (highest first)
    ?.map((user, index, sortedArray) => {
      let position;
      if (index === 0) {
        // For the first user
        position = 1;
      } else if (user.totalMark === sortedArray[index - 1].totalMark) {
        // Compare with the previous user
        position = sortedArray[index - 1].position; // Same position as the previous user if marks are equal
      } else {
        // Otherwise, the position is the current index + 1
        position = index + 1;
      }

      return {
        ...user,
        position,
      };
    });

  // console.log(userMarkInfo);
  useEffect(() => {
    async function fetchAttemtData() {
      // রেজল্ভ করা বেস URL
      const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
      try {
        const response = await api.get(`${baseURL}/quizzes/${quizId}/attempts`);
        if (response.status === 200) {
          console.log("Attempt data fetched successfully:", response.data);
          setLeaderBoardData(response?.data?.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        alert("Server Error");
      }
    }
    fetchAttemtData();
  }, []);

  // console.log(leaderBoardData);
  return (
    <div className="bg-[#F5F3FF]  p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClockLoader size={50} color="#000000" />
        </div>
      ) : (
        <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <LeaderBoardLeft userMarkInfo={userMarkInfo} />

              <LeaderBoardRight
                userMarkInfo={userMarkInfo}
                quizData={quizData}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default LeaderboardPage;
