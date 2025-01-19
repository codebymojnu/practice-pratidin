import { useAuth } from "../../hooks/useAuth";

function LeaderBoardRight({ userMarkInfo, quizData }) {
  const { auth } = useAuth();
  const user = auth?.user;

  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mb-6">{quizData?.title}</p>
      <ul className="space-y-4">
        {userMarkInfo?.slice(0, 5)?.map((singleUserInfo, index) => (
          <li
            key={singleUserInfo?.user?.id}
            className={`flex items-center justify-between ${
              user?.id === singleUserInfo?.user?.id
                ? "bg-violet-300 rounded"
                : ""
            }`}
          >
            <div className="flex items-center">
              <img
                src="./assets/avater.webp"
                alt="SPD Smith"
                className="object-cover w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">
                  {singleUserInfo?.user?.full_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {singleUserInfo?.position
                    ? singleUserInfo?.position
                    : index + 1}{" "}
                  Position
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">{singleUserInfo.totalMark}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoardRight;
