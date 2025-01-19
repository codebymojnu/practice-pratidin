import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import useResultStore from "../../store/resultStore";

export default function QuizSummaryMobile({ quizId }) {
  const { resultData } = useResultStore();

  return (
    <div className="bg-white flex flex-col justify-center items-center pb-4 pl-4 pr-4 pt-1">
      <img src="./assets/logo-white.svg" alt="logo" className="h-12 mb-6" />

      <div className="text-center w-full max-w-sm bg-gray-100 rounded-lg shadow p-4">
        <h2 className="text-lg font-bold text-primary mb-2">
          {resultData?.quizTitle || "কুইজ শিরোনাম"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {resultData?.quizDescription || "কুইজের বিবরণ"}
        </p>

        <div className="flex justify-center">
          <div className="my-2 w-1/2 ">
            <CircularProgressbar
              value={resultData?.percentage || 0}
              text={`${resultData?.percentage || 0}%`}
              styles={{
                path: { stroke: "#4CAF50" },
                text: { fill: "#333", fontSize: "8px" },
              }}
            />
          </div>
        </div>

        <p className="text-base font-medium text-gray-800 mb-4">
          মোট প্রশ্ন ছিল - {resultData?.totalQuestions || 0} টি, তুমি সঠিক উত্তর
          দিয়েছো {resultData?.correctAnswer || 0} টি, ভুল উত্তর দিয়েছো{" "}
          {resultData?.wrongAnswer || 0} টি।
        </p>
        <p className="text-sm text-red-600 mb-6">
          বিদ্র- উত্তর না করলেও তোমার উত্তরটি ভুল হিসেবেই গণনা হবে।
        </p>

        <Link
          to="/leaderboard"
          className="bg-primary text-white text-lg font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          state={{ quizId }}
        >
          লিডারবোর্ড দেখুন
        </Link>
      </div>
    </div>
  );
}
