// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { LuChevronRight } from "react-icons/lu";

// const breadcrumbLabels = {
//   dashboard: "Dashboard",
//   courses: "Courses",
//   videos: "Videos",
//   upload: "Upload Video",
//   edit: "Edit",
// };

// export default function Breadcrumb() {
//   const pathname = usePathname();
//   const pathSegments = pathname.split("/").filter((segment) => segment);

//   return (
//     <nav aria-label="breadcrumb" className="mb-4">
//       <ol className="flex items-center text-gray-600 text-sm space-x-2">
//         <li>
//           <Link href="/" className="text-blue-600 hover:underline">
//             Home
//           </Link>
//         </li>
//         {pathSegments.map((segment, index) => {
//           const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
//           const isLast = index === pathSegments.length - 1;
//           const label =
//             breadcrumbLabels[segment] ||
//             segment.charAt(0).toUpperCase() + segment.slice(1);

//           return (
//             <li key={href} className="flex items-center">
//               <span className="mx-1">
//                 <LuChevronRight />
//               </span>
//               {isLast ? (
//                 <span className="text-gray-500">{label}</span>
//               ) : (
//                 <Link href={href} className="text-blue-600 hover:underline">
//                   {label}
//                 </Link>
//               )}
//             </li>
//           );
//         })}
//       </ol>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";

import { LuChevronRight } from "react-icons/lu";

const breadcrumbLabels = {
  dashboard: "Dashboard",
  courses: "Courses",
  videos: "Videos",
  upload: "Upload Video",
  edit: "Edit",
  challenges: "Challenges",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const { courseId, videoId } = useParams();

  const { course, videos, getCourseById, loadCourseVideos } = useCourseStore();

  useEffect(() => {
    if (courseId && !course) getCourseById(courseId);
    if (courseId && videos.length === 0) loadCourseVideos(courseId);
  }, [courseId, course, videos.length, getCourseById, loadCourseVideos]);

  const getLabel = (segment) => {
    if (course && course.id === segment) return course.title;

    const video = videos.find((v) => v.id === segment);
    if (video) return video.title;

    return (
      breadcrumbLabels[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  };

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex items-center text-gray-600 text-sm space-x-2">
        {/* <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li> */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isFirst = index === 0;
          const isLast = index === pathSegments.length - 1;
          const label = getLabel(segment);

          return (
            <li key={href} className="flex items-center text-base">
              {!isFirst && (
                <span className="mx-1 text-gray-500">
                  <LuChevronRight />
                </span>
              )}
              {isLast ? (
                <span className="text-gray-500">{label}</span>
              ) : (
                <Link href={href} className="text-[#24b24c] hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
