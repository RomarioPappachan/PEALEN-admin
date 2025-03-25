"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useCourseStore } from "@/store/courseStore";

function UploadVideo() {
  const [videoData, setVideoData] = useState({
    addVideos: [],
  });

  const { addCourseVideo } = useCourseStore();

  const { courseId } = useParams();

  const router = useRouter();

  const addVideo = () => {
    setVideoData({
      ...videoData,
      addVideos: [
        ...videoData.addVideos,
        {
          title: "",
          videoThumbnail: "",
          videoUrl: "",
          demoVideourl: "",
          audioUrl: "",
          videoSteps: [],
        },
      ],
    });
  };

  const handleVideoChange = (index, e) => {
    const updatedVideos = [...videoData.addVideos];
    updatedVideos[index][e.target.name] = e.target.value;
    setVideoData({ ...videoData, addVideos: updatedVideos });
  };

  const removeVideo = (index) => {
    const updatedVideos = videoData.addVideos.filter((_, i) => i !== index);
    setVideoData({ ...videoData, addVideos: updatedVideos });
  };

  // Handle steps addition
  const addStep = (videoIndex) => {
    const updatedVideos = [...videoData.addVideos];
    updatedVideos[videoIndex].videoSteps.push("");
    setVideoData({ ...videoData, addVideos: updatedVideos });
  };

  // Handle step change
  const handleStepChange = (videoIndex, stepIndex, e) => {
    const updatedVideos = [...videoData.addVideos];
    updatedVideos[videoIndex].videoSteps[stepIndex] = e.target.value;
    setVideoData({ ...videoData, addVideos: updatedVideos });
  };

  // Remove a step
  const removeStep = (videoIndex, stepIndex) => {
    const updatedVideos = [...videoData.addVideos];
    updatedVideos[videoIndex].videoSteps.splice(stepIndex, 1);
    setVideoData({ ...videoData, addVideos: updatedVideos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { addVideos } = videoData;

    if (addVideos.length <= 0) {
      alert("Please enter atleast one video");
    }

    if (!addVideos[0].videoSteps[0]) {
      alert("Please enter the steps to follow");
    }

    try {
      await addCourseVideo(courseId, videoData);
      console.log("Videos successfully uploaded!");
      setVideoData({
        addVideos: [],
      });
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-5 text-green-500 text-2xl font-medium">Add Videos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {videoData.addVideos.map((video, index) => (
            <div key={index} className="border p-3 rounded-2xl space-y-2">
              <input
                type="text"
                name="title"
                placeholder="Video Title"
                value={video.title}
                onChange={(e) => handleVideoChange(index, e)}
                className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                required
              />
              <input
                type="url"
                name="videoThumbnail"
                placeholder="Video Thumbnail URL"
                value={video.videoThumbnail}
                onChange={(e) => handleVideoChange(index, e)}
                className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                required
              />
              <input
                type="url"
                name="videoUrl"
                placeholder="Video URL"
                value={video.videoUrl}
                onChange={(e) => handleVideoChange(index, e)}
                className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                required
              />
              <input
                type="url"
                name="demoVideourl"
                placeholder="Demo Video URL"
                value={video.demoVideourl}
                onChange={(e) => handleVideoChange(index, e)}
                className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                required
              />
              <input
                type="url"
                name="audioUrl"
                placeholder="Audio URL"
                value={video.audioUrl}
                onChange={(e) => handleVideoChange(index, e)}
                className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                required
              />

              <h3 className="text-md font-semibold mt-3">Video Steps:</h3>
              {video.videoSteps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex space-x-2">
                  <input
                    type="text"
                    value={step}
                    placeholder={`Step ${stepIndex + 1}`}
                    onChange={(e) => handleStepChange(index, stepIndex, e)}
                    className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(index, stepIndex)}
                    className="text-red-500 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addStep(index)}
                className="text-blue-500 cursor-pointer"
              >
                + Add Step
              </button>
              <br />
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="text-red-500 mt-5 cursor-pointer"
              >
                Remove Video
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addVideo}
          className="bg-blue-400 text-white py-2 px-4 rounded-2xl hover:bg-blue-500 cursor-pointer"
        >
          + Add New Video
        </button>

        {videoData.addVideos.length > 0 && (
          <button
            type="submit"
            className="ms-5 w-[200px] bg-green-400 text-white py-2 rounded-2xl hover:bg-green-500 cursor-pointer"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadVideo;
