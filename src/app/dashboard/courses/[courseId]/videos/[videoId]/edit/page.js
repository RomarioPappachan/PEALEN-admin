"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCourseStore } from "@/store/courseStore";

import { LuChevronLeft } from "react-icons/lu";
import Breadcrumb from "@/components/Breadcrumb";

function EditVideo() {
  const { courseId, videoId } = useParams();
  const { video, getCourseVideoById, editCourseVideo, loading, error } =
    useCourseStore();

  const [videoData, setVideoData] = useState({
    id: "",
    title: "",
    videoThumbnail: "",
    videoUrl: "",
    demoVideourl: "",
    audioUrl: "",
    videoTranscript: "",
    animationUrl: "",
    videoSteps: [],
  });

  const router = useRouter();

  useEffect(() => {
    if (videoId) {
      getCourseVideoById(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (video) {
      setVideoData({
        id: video?.id,
        title: video?.title,
        videoThumbnail: video?.videoThumbnail,
        videoUrl: video?.videoUrl,
        demoVideourl: video?.demoVideourl,
        audioUrl: video?.audioUrl,
        videoTranscript: video?.videoTranscript,
        animationUrl: video?.animationUrl,
        videoSteps: video?.videoSteps,
      });
    }
  }, [video]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const addVideoStep = () => {
    const updatedVideoSteps = [...videoData.videoSteps];
    updatedVideoSteps.push("");
    setVideoData({ ...videoData, videoSteps: updatedVideoSteps });
  };

  const handleVideoStepChange = (index, e) => {
    const updatedVideoSteps = [...videoData.videoSteps];
    updatedVideoSteps[index] = e.target.value;
    setVideoData({ ...videoData, videoSteps: updatedVideoSteps });
  };

  const removeVideoStep = (index) => {
    const updatedVideoSteps = [...videoData.videoSteps];
    updatedVideoSteps.splice(index, 1);
    setVideoData({ ...videoData, videoSteps: updatedVideoSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      videoThumbnail,
      videoUrl,
      demoVideourl,
      audioUrl,
      videoTranscript,
      animationUrl,
      videoSteps,
    } = videoData;
    if (
      !title ||
      !videoThumbnail ||
      !videoUrl ||
      !demoVideourl ||
      !audioUrl ||
      !videoTranscript ||
      !animationUrl ||
      !videoSteps[0]
    ) {
      alert("Enter required video details and video steps.");
    } else {
      try {
        await editCourseVideo(courseId, videoData);
        router.push(`/dashboard/courses/${courseId}/videos/${videoId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      <Breadcrumb />

      <Link
        href={`/dashboard/courses/${courseId}/videos/${videoId}`}
        className="text-blue-500 hover:underline flex items-center"
      >
        <LuChevronLeft className="text-2xl font-semibold" /> Back to video
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="title" className="font-semibold text-black">
              Video Title :
            </label>
            <input
              type="text"
              name="title"
              placeholder="Video Title"
              value={videoData.title}
              onChange={handleOnChange}
              className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
              required
            />
          </div>

          <div className="mt-4 p-4 py-10 border-[1px] border-slate-300 rounded-lg">
            <div className="flex items-start justify-start gap-2">
              {/* Class video and Audio  */}
              <div className="w-1/2 p-2 space-y-8">
                <label
                  htmlFor="videoThumbnail"
                  className="font-semibold text-black"
                >
                  Video Thumbnail :
                </label>
                <input
                  type="url"
                  name="videoThumbnail"
                  placeholder="Video Thumbnail"
                  value={videoData.videoThumbnail}
                  onChange={handleOnChange}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />
                <label
                  htmlFor="demoVideourl"
                  className="font-semibold text-black"
                >
                  Demo Video URL :
                </label>
                <input
                  type="url"
                  name="demoVideourl"
                  placeholder="Demo Video URL"
                  value={videoData.demoVideourl}
                  onChange={handleOnChange}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />
                <label
                  htmlFor="videoTranscript"
                  className="font-semibold text-black"
                >
                  Video Transcript :
                </label>
                <textarea
                  name="videoTranscript"
                  placeholder="Video Transcript"
                  value={videoData.videoTranscript}
                  rows={4}
                  onChange={handleOnChange}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />
              </div>

              {/* Demo Video and Audio */}
              <div className="w-1/2 p-2 space-y-8">
                <label htmlFor="videoUrl" className="font-semibold text-black">
                  Video URL :
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  placeholder="Video URL"
                  value={videoData.videoUrl}
                  onChange={handleOnChange}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />

                <label htmlFor="audioUrl" className="font-semibold text-black">
                  Audio URL :
                </label>
                <input
                  type="url"
                  name="audioUrl"
                  placeholder="Audio URL"
                  value={videoData.audioUrl}
                  onChange={handleOnChange}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />

                <label
                  htmlFor="animationUrl"
                  className="font-semibold text-black"
                >
                  Animation URL :
                </label>
                <input
                  type="url"
                  name="animationUrl"
                  placeholder="Animation URL"
                  value={videoData.animationUrl}
                  onChange={handleOnChange}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />
              </div>
            </div>

            {/* Video steps  */}
            <div className="p-2 mt-4">
              <h3 className="text-base font-semibold text-black">
                Steps to follow
              </h3>
              <div className="mt-4 space-y-2">
                {videoData?.videoSteps?.map((step, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder={`Video step ${index + 1}`}
                      value={step}
                      onChange={(e) => handleVideoStepChange(index, e)}
                      className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeVideoStep(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoStep}
                  className="bg-blue-400 text-white py-2 px-4 rounded-2xl hover:bg-blue-500 cursor-pointer"
                >
                  + Add Step
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-4 py-2 w-[200px] bg-green-400 text-white  rounded-2xl hover:bg-green-500 cursor-pointer"
            >
              Update Video
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditVideo;
