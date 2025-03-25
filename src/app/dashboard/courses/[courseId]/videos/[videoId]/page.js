"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/store/courseStore";

function VideoDetail() {
  const { courseId, videoId } = useParams();
  const { video, getCourseVideoById, loading, error } = useCourseStore();

  useEffect(() => {
    if (videoId) {
      getCourseVideoById(videoId);
    }
  }, [videoId]);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="p-4">
          <h3 className="mt-8 text-2xl font-semibold">{video?.title}</h3>

          <div className="mt-4 p-4 border-[1px] border-slate-300 rounded-lg">
            <div className="flex items-start justify-start gap-2">
              {/* Class video and Audio  */}
              <div className="w-1/2 p-2">
                <h4 className="text-md font-semibold text-black">
                  {video?.title}
                </h4>
                <video controls className="w-full max-w-md mt-2 rounded-lg">
                  <source src={video?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h4 className="mt-4 text-md font-semibold text-black">Audio</h4>
                <audio controls className="w-full max-w-md mt-2">
                  <source src={video?.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              {/* Demo Video and Audio */}
              <div className="w-1/2 p-2">
                <h4 className="text-md font-semibold text-black">
                  Demonstration Video
                </h4>
                <video controls className="w-full max-w-md mt-2 rounded-lg">
                  <source src={video?.demoVideourl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Video steps  */}
            <div className="p-2 mt-4">
              <h3 className="text-lg">Steps to follow</h3>
              <ul className="mt-4">
                {video?.videoSteps?.map((step, ind) => (
                  <li key={ind} className="text-sm">
                    <span>Step {ind + 1}: </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetail;
