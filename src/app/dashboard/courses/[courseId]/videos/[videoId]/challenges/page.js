"use client";

import { useEffect, useState } from "react";
import { useCourseStore } from "@/store/courseStore";
import Breadcrumb from "@/components/Breadcrumb";
import AddChallenge from "@/components/courses/challenges/AddChallenge";
import { useParams } from "next/navigation";
import ChallengeQuestion from "@/components/courses/challenges/ChallengeQuestion";
import EditChallenge from "@/components/courses/challenges/EditChallenge";

import { LuTrash2, LuPencilLine } from "react-icons/lu";
import DeleteChallenge from "@/components/courses/challenges/DeleteChallenge";

function Challenges() {
  const { videoId } = useParams();
  const { challenge, getCourseVideoById } = useCourseStore();

  const [challengeData, setChallengeData] = useState({});

  const [isAddChallengeOpen, setIsAddChallengeOpen] = useState(false);
  const [isEditChallengeOpen, setIsEditChallengeOpen] = useState(false);
  const [isDeleteChallengeOpen, setIsDeleteChallengeOpen] = useState(false);

  useEffect(() => {
    if (videoId) {
      getCourseVideoById(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (challenge) {
      setChallengeData(challenge);
    }
  }, [challenge]);

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex justify-end gap-x-4">
        {challengeData?.id ? (
          <>
            <button
              className="px-4 py-2 bg-rose-600 text-white rounded-lg cursor-pointer hover:bg-rose-500 flex items-center gap-2"
              onClick={() => {
                setIsDeleteChallengeOpen(true);
              }}
            >
              <LuTrash2 />
              <span>Delete</span>
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 flex items-center gap-2"
              onClick={() => {
                setIsEditChallengeOpen(true);
              }}
            >
              <LuPencilLine />
              <span>Edit</span>
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-500"
            onClick={() => {
              setIsAddChallengeOpen(true);
            }}
          >
            Create a Challenge
          </button>
        )}
      </div>

      {!challengeData?.id ? (
        <div className="p-6 rounded-lg border-2 border-gray-300 bg-[var(--background-primary)]">
          <h1 className="text-base text-black font-light">
            Please create a challenge for the video
          </h1>
        </div>
      ) : (
        <div className="p-6 rounded-lg space-y-6 border border-gray-300 bg-[var(--background-primary)]">
          <h1 className="text-xl text-black font-semibold">
            {challengeData?.challenge?.description}
          </h1>
          <div className="space-y-10">
            {challengeData?.questions.map((question, index) => (
              <ChallengeQuestion
                question={question}
                index={index}
                key={question.id}
              />
            ))}
          </div>
        </div>
      )}

      {isAddChallengeOpen && (
        <AddChallenge setIsAddChallengeOpen={setIsAddChallengeOpen} />
      )}

      {isEditChallengeOpen && (
        <EditChallenge
          videoId={videoId}
          setIsEditChallengeOpen={setIsEditChallengeOpen}
        />
      )}
      {isDeleteChallengeOpen && (
        <DeleteChallenge
          videoId={videoId}
          challengeId={challengeData?.id}
          setIsDeleteChallengeOpen={setIsDeleteChallengeOpen}
        />
      )}
    </div>
  );
}

export default Challenges;
