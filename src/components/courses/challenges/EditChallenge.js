"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/store/courseStore";
import { LuX } from "react-icons/lu";

function EditChallenge({ videoId, setIsEditChallengeOpen }) {
  const { challenge, editChallenge, getCourseVideoById } = useCourseStore();

  const [updatedChallengeData, setUpdatedChallengeData] = useState({});

  useEffect(() => {
    if (challenge) {
      setUpdatedChallengeData(challenge);
    }
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setUpdatedChallengeData((prev) => ({
      ...prev,
      challenge: { ...prev.challenge, description: value }, // Preserve other properties in challenge
    }));
  }

  function handleQuestionChange(index, e) {
    const { name, value } = e.target;
    const updatedQuestions = [...updatedChallengeData.questions];
    updatedQuestions[index][name] = value;
    setUpdatedChallengeData({
      ...updatedChallengeData,
      questions: updatedQuestions,
    });
  }

  function addQuestion() {
    const updatedQuestions = [...updatedChallengeData.questions];
    updatedQuestions.push({
      text: "",
      options: [],
      correctAnswer: "",
    });
    setUpdatedChallengeData({
      ...updatedChallengeData,
      questions: updatedQuestions,
    });
  }

  function removeQuestion(index) {
    const updatedQuestions = [...updatedChallengeData.questions];
    updatedQuestions.splice(index, 1);
    setUpdatedChallengeData({
      ...updatedChallengeData,
      questions: updatedQuestions,
    });
  }

  function addOption(index) {
    const updatedQuestions = [...updatedChallengeData.questions];
    updatedQuestions[index].options.push("");
    setUpdatedChallengeData({
      ...updatedChallengeData,
      questions: updatedQuestions,
    });
  }

  function handleOptionChange(index, optionIndex, e) {
    const updatedQuestions = [...updatedChallengeData.questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setUpdatedChallengeData({
      ...updatedChallengeData,
      questions: updatedQuestions,
    });
  }

  function removeOption(index, optionIndex) {
    const updatedQuestions = [...updatedChallengeData.questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setUpdatedChallengeData({
      ...updatedChallengeData,
      questions: updatedQuestions,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    editChallenge(videoId, updatedChallengeData);
    setIsEditChallengeOpen(false); // Close the popup after submission
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen px-20 py-10 text-[var(--text-color-secondary)] bg-[var(--background-secondary)] overflow-y-auto">
      <div className="relative">
        <h2 className="my-5 text-black text-4xl font-semibold ">
          Edit Challenge
        </h2>
        <button
          className="p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-200 absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            setIsEditChallengeOpen(false);
          }}
        >
          <LuX className="text-2xl " />
        </button>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Challenge Description"
          value={updatedChallengeData?.challenge?.description}
          onChange={handleOnChange}
          className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
          required
        />
        {updatedChallengeData?.questions?.map((question, index) => (
          <div
            key={index}
            className="border border-gray-400 p-3 rounded-2xl space-y-4"
          >
            <h3 className="text-md font-semibold mt-3">
              Questions {index + 1}:
            </h3>
            <input
              type="text"
              name="text"
              placeholder={`Question ${index + 1}`}
              value={question.text}
              onChange={(e) => handleQuestionChange(index, e)}
              className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
              required
            />

            <h3 className="text-md font-semibold mt-3">Options:</h3>
            {question?.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex space-x-2">
                <input
                  type="text"
                  value={option}
                  placeholder={`Option ${optionIndex + 1}`}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeOption(index, optionIndex)}
                  className="text-red-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addOption(index)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                + Add Option
              </button>
            </div>

            <label
              htmlFor="correctAnswer"
              className="text-md font-semibold mt-3"
            >
              Answer:{" "}
            </label>
            <select
              id="correctAnswer"
              name="correctAnswer"
              value={question.correctAnswer}
              placeholder={`Correct Answer`}
              required
              className="w-full p-2 px-4 border border-gray-300 bg-transparent rounded-2xl outline-none focus:border-green-300"
              onChange={(e) => handleQuestionChange(index, e)}
            >
              <option value="" disabled>
                -- Select correct answer --
              </option>
              {question?.options?.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-red-500 mt-5 cursor-pointer hover:underline"
              >
                Remove Question {index + 1}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-400 text-white py-2 px-4 rounded-2xl hover:bg-blue-500 cursor-pointer"
        >
          + Add Question
        </button>
        <div className="flex justify-end">
          <button
            type="button"
            className="w-[200px] bg-red-400 text-white py-2 rounded-2xl hover:bg-red-500 cursor-pointer"
            onClick={() => {
              setIsEditChallengeOpen(false);
            }}
          >
            Cancel
          </button>
          {updatedChallengeData?.questions?.length > 0 && (
            <button
              type="submit"
              className="ms-5 w-[200px] bg-green-400 text-white py-2 rounded-2xl hover:bg-green-500 cursor-pointer"
            >
              Update Challenge
            </button>
          )}
        </div>
      </form>
    </div>,
    document.body
  );
}

export default EditChallenge;
