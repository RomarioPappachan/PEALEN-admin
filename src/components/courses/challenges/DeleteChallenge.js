"use client";

import { createPortal } from "react-dom";
import { useCourseStore } from "@/store/courseStore";

function DeleteChallenge({ videoId, challengeId, setIsDeleteChallengeOpen }) {
  console.log(videoId, "challenge", challengeId);
  const { removeChallenge } = useCourseStore();

  const handleDelete = async (videoId, challengeId, e) => {
    e.preventDefault();
    const response = await removeChallenge(videoId, challengeId);
    if (response.message) {
      alert("Challenge deleted successfully");
      setIsDeleteChallengeOpen(false);
    }
  };
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen px-20 py-10 flex justify-center items-center backdrop-blur-sm">
      <div className="p-6 w-[500px] h-[250px] rounded-lg text-[var(--text-color-secondary)] bg-[var(--background-secondary)] border border-gray-300">
        <div className="relative">
          <span
            onClick={() => setIsDeleteChallengeOpen(false)}
            className="absolute right-0 top-0 text-gray-600 cursor-pointer hover:text-black"
          >
            ✕
          </span>
        </div>
        <div className="py-10">
          <p className="text-center">
            Do you really want to delete this challenge?
          </p>
        </div>

        <div className="flex justify-around items-center">
          <button
            className="px-4 py-2 bg-rose-600 text-white rounded-lg cursor-pointer hover:bg-rose-500 flex items-center gap-2"
            onClick={(e) => {
              handleDelete(videoId, challengeId, e);
            }}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 flex items-center gap-2"
            onClick={() => setIsDeleteChallengeOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteChallenge;
