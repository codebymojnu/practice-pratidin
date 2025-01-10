import { Link } from "react-router-dom";

export default function QuizCard({
  quizId,
  title,
  description,
  thumbnail,
  totalQuestion,
  isAttempted,
}) {
  return (
    <Link to={isAttempted ? `/result` : "/quiz"} state={{ quizId }}>
      <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] p-1 bg-white">
        {/* Background image */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay for text */}
        <div className="absolute inset-0 text-white flex flex-col justify-center items-center text-center px-1">
          <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-2 font-google">
            {description}
          </p>
          <p className="text-base sm:text-lg md:text-xl font-semibold mb-4">
            Total Questions: {totalQuestion}
          </p>
          {!isAttempted && (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200">
              START THE EXAM
            </button>
          )}
        </div>

        {/* Conditional overlay for attempted quizzes */}
        {isAttempted && (
          <div className="hidden absolute inset-0 bg-black/70 text-white flex flex-col justify-center items-center text-center group-hover:flex p-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              Already Participated
            </h1>
            <Link
              to="/result"
              state={{ quizId }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 transition duration-200"
            >
              View Result
            </Link>
            <Link
              to="/leaderboard"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              View Leaderboard
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
}
