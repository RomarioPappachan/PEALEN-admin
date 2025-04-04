"use client";

import React, { useEffect, useState } from "react";
import { useCourseStore } from "@/store/courseStore";

function CreateCourse({ setIsCreateCourseOpen }) {
  const { categories, getCategories, addCourse, getCourses, loading } =
    useCourseStore();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    courseContents: "",
    categoryId: "",
    videos: [],
  });

  console.log(categories);

  // loading course categories
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseContentsChange = (e) => {
    setCourseData({ ...courseData, courseContents: e.target.value });
  };

  const addVideo = () => {
    setCourseData({
      ...courseData,
      videos: [
        ...courseData.videos,
        {
          title: "",
          videoThumbnail: "",
          videoUrl: "",
          demoVideourl: "",
          audioUrl: "",
          videoTranscript: "",
          animationUrl: "",
          videoSteps: [], // New property to store steps
        },
      ],
    });
  };

  const handleVideoChange = (index, e) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[index][e.target.name] = e.target.value;
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  const removeVideo = (index) => {
    const updatedVideos = courseData.videos.filter((_, i) => i !== index);
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  // Handle steps addition
  const addStep = (videoIndex) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[videoIndex].videoSteps.push("");
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  // Handle step change
  const handleStepChange = (videoIndex, stepIndex, e) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[videoIndex].videoSteps[stepIndex] = e.target.value;
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  // Remove a step
  const removeStep = (videoIndex, stepIndex) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[videoIndex].videoSteps.splice(stepIndex, 1);
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...courseData,
        courseContents: courseData.courseContents
          .split(",")
          .map((item) => item.trim()),
      };
      await addCourse(formattedData);
      console.log("Course successfully created!");
      setIsCreateCourseOpen(false);
      getCourses(); // Refresh course list
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen px-2 py-10 backdrop-blur-sm fixed left-0 top-0 flex justify-center items-center z-30">
      <div className="bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] dark:border-[var(--background-secondary)] p-6 rounded-2xl shadow-lg w-full max-h-[500px] max-w-[800px] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <span
            onClick={() => setIsCreateCourseOpen(false)}
            className="text-gray-600 cursor-pointer hover:text-black"
          >
            ✕
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
            required
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
            rows={3}
            required
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={courseData.thumbnail}
            onChange={handleChange}
            className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
            required
          />
          {/* <input
            type="text"
            name="categoryId"
            placeholder="Category ID"
            value={courseData.categoryId}
            onChange={handleChange}
            className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
            required
          /> */}

          {/* Category Dropdown */}
          <select
            name="categoryId"
            value={courseData.categoryId}
            className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="courseContents"
            placeholder="Course Contents (comma-separated)"
            value={courseData.courseContents}
            onChange={handleCourseContentsChange}
            className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
            required
          />
          <div className="space-y-4">
            {courseData.videos.map((video, index) => (
              <div key={index} className="border p-3 rounded-2xl space-y-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                  required
                />
                <input
                  type="url"
                  name="videoThumbnail"
                  placeholder="Video Thumbnail URL"
                  value={video.videoThumbnail}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                />
                <input
                  type="url"
                  name="videoUrl"
                  placeholder="Video URL"
                  value={video.videoUrl}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                />
                <input
                  type="url"
                  name="demoVideourl"
                  placeholder="Demo Video URL"
                  value={video.demoVideourl}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                />
                <input
                  type="url"
                  name="audioUrl"
                  placeholder="Audio URL"
                  value={video.audioUrl}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                />
                <input
                  type="text"
                  name="videoTranscript"
                  placeholder="Video Transcript"
                  value={video.videoTranscript}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                />
                <input
                  type="text"
                  name="animationUrl"
                  placeholder="Animation URL"
                  value={video.animationUrl}
                  onChange={(e) => handleVideoChange(index, e)}
                  className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                />

                <h3 className="text-md font-semibold mt-3">Video Steps:</h3>
                {video.videoSteps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex space-x-2">
                    <input
                      type="text"
                      value={step}
                      placeholder={`Step ${stepIndex + 1}`}
                      onChange={(e) => handleStepChange(index, stepIndex, e)}
                      className="w-full p-2 px-4 text-gray-800 border border-gray-300 rounded-2xl outline-none focus:border-green-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(index, stepIndex)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addStep(index)}
                  className="text-blue-500"
                >
                  + Add Step
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="text-red-500 mt-5"
                >
                  Remove Video
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addVideo}
            className="bg-blue-400 text-white py-2 px-4 rounded-2xl hover:bg-blue-500"
          >
            Add Video
          </button>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="w-[200px] bg-green-400 text-white py-2 rounded-2xl hover:bg-green-500"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
