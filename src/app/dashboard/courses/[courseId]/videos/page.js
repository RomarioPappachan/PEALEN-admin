"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/store/courseStore";
import ButtonComponent from "@/components/ui/Button";
import { LuNotebookPen, LuTrash2, LuEye } from "react-icons/lu";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

function CourseVideos() {
  const { courseId } = useParams();
  const { videos, loadCourseVideos, removeCourseVideo, loading, error } =
    useCourseStore();
  console.log(videos);

  useEffect(() => {
    if (courseId) {
      loadCourseVideos(courseId);
    }
  }, [courseId]);

  const handleDelete = async (videoId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) return;

    try {
      await removeCourseVideo(courseId, videoId);
      await loadCourseVideos(courseId); // Refresh video list after deletion
    } catch (err) {
      alert("Failed to delete video. Please try again.");
    }
  };

  // if (loading) return <p>Loading course videos...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;
  // if (videos.length < 1) return <p>No videos found.</p>;

  return (
    <div className="">
      <Breadcrumb />
      <ButtonComponent href={`/dashboard/courses/${courseId}`}>
        Back to Course
      </ButtonComponent>

      {/* Add new course  */}
      <div className="flex items-center justify-end">
        <Link
          href={`/dashboard/courses/${courseId}/videos/upload`}
          className="bg-green-400 text-white px-4 py-2 text-base font-semibold rounded-lg hover:bg-green-500"
        >
          + Add New Video
        </Link>
      </div>

      {loading ? (
        <p>Loading course videos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : videos.length < 1 ? (
        <p>No videos found.</p>
      ) : (
        <div className="mt-4 p-6 bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] shadow-md rounded-lg">
          <h2 className="text-2xl text-black font-semibold mb-6">
            Course Videos
          </h2>
          <div className="flex flex-col gap-4">
            {/* video card  */}

            {videos.length > 0 &&
              videos.map((video, index) => (
                <div
                  key={video.title}
                  className="px-4 py-2 rounded-xl bg-inherit border-2 border-gray-300 flex justify-between items-center gap-2"
                >
                  <div className="w-1/12">
                    <img
                      src={video.videoThumbnail}
                      alt=""
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="min-w-8/12">{video.title}</p>
                  <Link
                    href={`/dashboard/courses/${courseId}/videos/${video.id}`}
                    className="text-black hover:text-blue-400 hover:underline"
                  >
                    <span>
                      <LuEye className="text-2xl" />
                    </span>
                  </Link>
                  <Link
                    href={`/dashboard/courses/${courseId}/videos/${video.id}/edit`}
                  >
                    <span>
                      <LuNotebookPen className="text-xl text-blue-400" />
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => handleDelete(video.id)}
                  >
                    <span>
                      <LuTrash2 className="text-xl text-red-400" />
                    </span>
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseVideos;
