"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/store/courseStore";
import ButtonComponent from "@/components/ui/Button";
import { LuNotebookPen } from "react-icons/lu";
import Link from "next/link";

function CourseVideos() {
  const { courseId } = useParams();
  const { videos, loadCourseVideos, loading, error } = useCourseStore();
  console.log(videos);

  useEffect(() => {
    if (courseId) {
      loadCourseVideos(courseId);
    }
  }, [courseId]);

  // if (loading) return <p>Loading course videos...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;
  // if (videos.length < 1) return <p>No videos found.</p>;

  return (
    <div className="p-6">
      <ButtonComponent href={`/dashboard/courses/${courseId}`}>
        Back to Course
      </ButtonComponent>

      <div className="mt-4 p-6 bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] shadow-md rounded-lg">
        <h2 className="text-2xl text-black font-semibold">Course Videos</h2>
        <div className="flex flex-col gap-4">
          {/* Add new course  */}
          <div className="flex items-center justify-end">
            <Link
              href={`/dashboard/courses/${courseId}/videos/upload`}
              className="bg-green-400 text-white px-4 py-2 text-base font-semibold rounded-lg hover:bg-green-500"
            >
              + Add New Video
            </Link>
          </div>

          {/* video card  */}

          {videos.length > 0 &&
            videos.map((video, index) => (
              <div
                key={video.title}
                className="p-8 rounded-xl bg-inherit border-2 border-gray-300 flex justify-between items-center gap-2"
              >
                <div className="w-1/12">
                  <img src={video.videoThumbnail} alt="" className="w-full" />
                </div>
                <p className="min-w-8/12">{video.title}</p>
                <Link
                  href={`/dashboard/courses/${courseId}/videos/${video.id}`}
                >
                  <span>View</span>
                </Link>
                <span>
                  <LuNotebookPen />
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseVideos;
