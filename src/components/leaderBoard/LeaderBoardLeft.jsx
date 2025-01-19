import React from "react";
import { useAuth } from "../../hooks/useAuth";

function LeaderBoardLeft({ userMarkInfo }) {
  const { auth } = useAuth();
  const user = auth?.user;

  const userInfo = userMarkInfo?.find((aUser) => aUser?.user?.id === user?.id);
  // console.log(userInfo);

  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex flex-col items-center mb-6">
        <img
          src="./assets/avater.webp"
          alt="Profile Pic"
          className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{userInfo?.user?.full_name}</h2>
        <p className="text-xl">{userInfo?.position} Position</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm opacity-75">Mark</p>
          <p className="text-2xl font-bold">{userInfo?.totalMark}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Correct</p>
          <p className="text-2xl font-bold">{userInfo?.totalCorrect}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Wrong</p>
          <p className="text-2xl font-bold">{userInfo?.totalWrong}</p>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardLeft;
