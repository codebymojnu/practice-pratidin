// QuizSummary.jsx
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";

export default function QuizSummary() {
  return (
    <>
      <img
        src="./assets/logo-white.svg"
        alt="logo"
        className="max-h-11 fixed left-6 top-6 z-50"
      />

      <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
        <div>
          <div className="text-white">
            <div>
              <h2 className="text-4xl font-bold mb-2">Quiz Title</h2>
              <p>Quiz description or additional details.</p>
            </div>
            <div className="my-6 flex items-center">
              <div className="w-1/2">
                <div className="flex gap-6 my-6">
                  <div>
                    <p className="font-semibold text-2xl my-0">0</p>
                    <p className="text-gray-300">Questions</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl my-0">0</p>
                    <p className="text-gray-300">Correct</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl my-0">0</p>
                    <p className="text-gray-300">Wrong</p>
                  </div>
                </div>
                <Link
                  to="/leaderboard"
                  className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                >
                  View Leaderboard
                </Link>
              </div>
              <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold">0/0</p>
                  <p>Your Mark</p>
                </div>
                <div>
                  <CircularProgressbar
                    className="h-20"
                    styles={{
                      text: {
                        fill: "#fff",
                      },
                    }}
                    value={50}
                    text={`50%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
