// "use client";

// import React, { useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { useCourseStore } from "@/store/courseStore";

// function CourseDetail() {
//   const { courseId } = useParams();
//   const { course, getCourseById, loading, error } = useCourseStore();

//   useEffect(() => {
//     getCourseById(courseId);
//   }, [courseId]);

//   if (loading) return <p>Loading course details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!course) return <p>No course found.</p>;

//   return (
//     <div className="p-6">
//       <Link href="/dashboard/courses" className="text-blue-500 hover:underline">
//         &larr; Back to Courses
//       </Link>

//       <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
//         <h1 className="text-2xl font-bold">{course?.title}</h1>
//         <img src={course?.thumbnail} alt="Course Thumbnail" className="mt-4 w-full h-64 max-w-md rounded-lg" />
//         <p className="mt-2 text-gray-600">{course?.description}</p>

//         <h3 className="mt-4 text-lg font-semibold">Category</h3>
//         <p className="text-gray-600">{course?.category?.name}</p>

//         <h3 className="mt-4 text-lg font-semibold">Instructor</h3>
//         <p className="text-gray-600">
//           {course?.instructor?.firstName} {course?.instructor?.lastName}
//         </p>
//         <p className="text-gray-600">
//           {course?.instructor?.email}
//         </p>

//         <h3 className="mt-4 text-lg font-semibold">Course Contents</h3>
//         <ul className="list-disc list-inside text-gray-600">
//           {course?.courseContents.map((content, index) => (
//             <li key={index}>{content}</li>
//           ))}
//         </ul>

//         <h3 className="mt-4 text-lg font-semibold">Price</h3>
//         <p className="text-gray-600">${course?.price}</p>
//       </div>
//     </div>
//   );
// }

// export default CourseDetail;

"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCourseStore } from "@/store/courseStore";
import { LuChevronLeft } from "react-icons/lu";
import ButtonComponent from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";

function CourseDetail() {
  const { courseId } = useParams();
  const { course, getCourseById, loading, error } = useCourseStore();

  console.log(course);

  useEffect(() => {
    getCourseById(courseId);
  }, [courseId]);

  // if (loading) return <p>Loading course details...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;
  // if (!course) return <p>No course found.</p>;

  return (
    <div className="">
      <Breadcrumb />
      <Link
        href="/dashboard/courses"
        className="text-blue-500 hover:underline flex items-center my-6"
      >
        <LuChevronLeft className="text-2xl font-semibold" />
        Back to Courses
      </Link>

      {loading ? (
        <p>Loading course details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : !course ? (
        <p>No course found.</p>
      ) : (
        <div className="mt-4 p-6 bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] shadow-md rounded-lg">
          {/* bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] */}
          <div className="p-8 rounded-xl bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)]">
            <div className="flex justify-start items-start gap-4 pb-4 ">
              <div className="w-1/2">
                <h1 className="text-3xl text-wrap font-bold">
                  {course?.title}
                </h1>
                <p className="my-4 text-gray-600 text-wrap text-lg">
                  {course?.description}
                </p>
                <span className="p-1 text-sm text-blue-500 bg-blue-100 rounded-md">
                  {course?.category?.name}
                </span>
                <p className="mt-4 text-gray-600">
                  <span>Created by: </span>
                  <span className="font-semibold">
                    {course?.instructor?.firstName}{" "}
                    {course?.instructor?.lastName}
                  </span>
                </p>
                <p className="text-gray-600">{course?.instructor?.email}</p>
                <p className="mt-8 text-xl font-normal text-gray-600">
                  <span>Price: </span>
                  <span className="font-bold">${course?.price}</span>
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src={course?.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            <div className="py-8 border-b-2 border-slate-200 flex justify-between items-center gap-4">
              <Link href={`/dashboard/courses/${courseId}/videos`}>
                <span className="px-2 py-3 no-underline rounded-md text-base bg-blue-500 text-white">
                  All Course videos
                </span>
              </Link>
              <Link href={`/dashboard/courses/${courseId}/edit`}>
                <span className="px-2 py-3 no-underline rounded-md text-base bg-red-500 text-white">
                  Edit Course Details
                </span>
              </Link>
            </div>
            <div>
              <h3 className="mt-4 text-lg font-semibold">Course Contents</h3>
              <ul className="list-disc list-inside text-gray-600">
                {course?.courseContents.map((content, index) => (
                  <li key={index}>{content}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Videos  */}
          <div className="p-4">
            <h3 className="mt-8 text-2xl font-semibold">Videos</h3>
            {course?.videos?.map((video, index) => (
              <div
                key={index}
                className="mt-4 p-4 border-[1px] border-slate-300 rounded-lg"
              >
                <div className="flex items-start justify-start gap-2">
                  {/* Class video and Audio  */}
                  <div className="w-1/2 p-2">
                    <h4 className="text-md font-semibold text-black">
                      {video.title}
                    </h4>
                    <video controls className="w-full max-w-md mt-2 rounded-lg">
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <h4 className="mt-4 text-md font-semibold text-black">
                      Audio
                    </h4>
                    <audio controls className="w-full max-w-md mt-2">
                      <source src={video.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Demo Video and Audio */}
                  <div className="w-1/2 p-2">
                    <h4 className="text-md font-semibold text-black">
                      Demonstration Video
                    </h4>
                    <video controls className="w-full max-w-md mt-2 rounded-lg">
                      <source src={video.demoVideourl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* <h4 className="mt-4 text-md font-semibold text-black">
                    Demo Audio
                  </h4>
                  <audio controls className="w-full max-w-md mt-2">
                    <source src={video.demoAudiourl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio> */}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
