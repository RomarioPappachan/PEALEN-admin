// import React from "react";

// function CourseListTable() {
//   const users = [
//     {
//       name: "Yiorgos Avraamu",
//       status: "New",
//       registered: "Jan 10, 2023",
//       country: "🇺🇸",
//       usage: 50,
//       usagePeriod: "Jun 11, 2023 - Jul 10, 2023",
//       payment: "Mastercard",
//       lastLogin: "10 seconds ago",
//     },
//     {
//       name: "Avram Tarasios",
//       status: "Recurring",
//       registered: "Jan 10, 2023",
//       country: "🇧🇷",
//       usage: 10,
//       usagePeriod: "Jun 11, 2023 - Jul 10, 2023",
//       payment: "Visa",
//       lastLogin: "5 minutes ago",
//     },
//     {
//       name: "Quintin Ed",
//       status: "New",
//       registered: "Jan 10, 2023",
//       country: "🇮🇳",
//       usage: 74,
//       usagePeriod: "Jun 11, 2023 - Jul 10, 2023",
//       payment: "Stripe",
//       lastLogin: "1 hour ago",
//     },
//     {
//       name: "Enéas Kwadwo",
//       status: "New",
//       registered: "Jan 10, 2023",
//       country: "🇫🇷",
//       usage: 98,
//       usagePeriod: "Jun 11, 2023 - Jul 10, 2023",
//       payment: "PayPal",
//       lastLogin: "1 week ago",
//     },
//     {
//       name: "Agapetus Tadeáš",
//       status: "New",
//       registered: "Jan 10, 2023",
//       country: "🇪🇸",
//       usage: 22,
//       usagePeriod: "Jun 11, 2023 - Jul 18, 2023",
//       payment: "Apple Pay",
//       lastLogin: "3 months ago",
//     },
//     {
//       name: "Friderik Dávid",
//       status: "New",
//       registered: "Jan 10, 2023",
//       country: "🇩🇪",
//       usage: 43,
//       usagePeriod: "Jun 11, 2023 - Jul 10, 2023",
//       payment: "Western Union",
//       lastLogin: "1 year ago",
//     },
//   ];

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="w-full text-left bg-transparent shadow-md rounded-lg">
//         <thead className="bg-transparent border-b">
//           <tr>
//             <th className="p-4">User</th>
//             <th className="p-4">Country</th>
//             <th className="p-4">Usage</th>
//             <th className="p-4">Payment Method</th>
//             <th className="p-4">Activity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr
//               key={index}
//               className="border-b-[1px] border-b-[#dcdce3] dark:border-b-gray-700 last:border-0 hover:bg-[var(--background-secondary)] dark:hover:bg-[var(--background-secondary)] transition-all duration-300"
//             >
//               {/* User Section */}
//               <td className="p-4 flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                   <span className="text-sm">{user.name[0]}</span>
//                 </div>
//                 <div>
//                   <p className="font-semibold">{user.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {user.status} | Registered: {user.registered}
//                   </p>
//                 </div>
//               </td>

//               {/* Country */}
//               <td className="p-4 text-lg">{user.country}</td>

//               {/* Usage */}
//               <td className="p-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium">{user.usage}%</span>
//                   <div className="w-full bg-gray-200 rounded-full h-2 relative">
//                     <div
//                       className={`h-2 rounded-full ${
//                         user.usage > 75
//                           ? "bg-red-500"
//                           : user.usage > 50
//                           ? "bg-yellow-500"
//                           : "bg-green-500"
//                       }`}
//                       style={{ width: `${user.usage}%` }}
//                     ></div>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-500">{user.usagePeriod}</p>
//               </td>

//               {/* Payment Method */}
//               <td className="p-4">{user.payment}</td>

//               {/* Activity */}
//               <td className="p-4">
//                 <p className="text-sm text-gray-500">Last login</p>
//                 <p className="text-sm">{user.lastLogin}</p>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CourseListTable;

// "use client";
// import React, { useEffect } from "react";
// import { useCourseStore } from "@/store/courseStore";
// import { LuNotebookPen } from "react-icons/lu";
// import { LuTrash2 } from "react-icons/lu";

// function CourseListTable() {
//   const { courses, getCourses, loading, error } = useCourseStore();
// console.log(courses);

//   useEffect(() => {
//     getCourses();
//   }, []);

//   if (loading) return <p>Loading courses...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="w-full text-left bg-transparent shadow-md rounded-lg">
//         <thead className="bg-transparent border-b">
//           <tr>
//             <th className="p-4">Course Name</th>
//             <th className="p-4">Instructor</th>
//             <th className="p-4">Price</th>
//             <th className="p-4">View</th>
//             <th className="p-4">Actions</th>

//           </tr>
//         </thead>
//         <tbody>
//           {courses.length > 0 ? (
//             courses.map((course) => (
//               <tr
//                 key={course.id}
//                 className="border-b-[1px] border-b-[#dcdce3] dark:border-b-gray-700 last:border-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
//               >
//                 {/* <td className="p-4">{course.name}</td> */}
//                 <td className="p-4 flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">

//                     <img src={course?.thumbnail} alt="" />

//                 </div>
//                 <div>
//                   <p className="font-semibold capitalize">{course?.title}</p>
//                   <p className="text-sm text-gray-500">
//                   {course?.category?.name}
//                   </p>
//                 </div>
//               </td>
//                 <td className="p-4 capitalize text-gray-600 text-sm"> {course?.instructor?.lastName} {course?.instructor?.firstName}</td>
//                 <td className="p-4 capitalize text-gray-600 text-sm">{course?.price}</td>
//                 <td className="p-3">
//                 <span className="text-gray-600 text-sm hover:underline cursor-pointer">View Details</span>
//                 </td>
//                 <td className="p-4 flex gap-3">
//                   <button className="px-3  text-blue-500 text-xl hover:scale-110 cursor-pointer"><LuNotebookPen/></button>
//                   <button className="px-3  text-red-500  text-xl hover:scale-110 cursor-pointer"><LuTrash2/></button>
//                 </td>

//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="p-4 text-center" colSpan="4">
//                 No courses found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CourseListTable;

// "use client";
// import React, { useEffect } from "react";
// import { useCourseStore } from "@/store/courseStore";
// import { LuNotebookPen, LuTrash2 } from "react-icons/lu";
// import Link from "next/link";

// function CourseListTable() {
//   const { courses, getCourses, removeCourse, loading, error } = useCourseStore();

//   useEffect(() => {
//     getCourses();
//   }, []);

//   const handleDelete = async (courseId) => {
//     if (confirm("Are you sure you want to delete this course?")) {
//       await removeCourse(courseId);
//     }
//   };

//   if (loading) return <p>Loading courses...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="w-full text-left bg-[var(--background-tertiary)] shadow-md rounded-lg">
//         <thead className="bg-[var(--background-tertiary)] border-b">
//           <tr>
//             <th className="p-4">Course Name</th>
//             <th className="p-4">Instructor</th>
//             <th className="p-4">Price</th>
//             <th className="p-4">View</th>
//             <th className="p-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.length > 0 ? (
//             courses.map((course) => (
//               <tr
//                 key={course.id}
//                 className="bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] hover:bg-[var(--background-secondary)] dark:hover:bg-[var(--background-secondary)] border-b-[1px] border-b-[#dcdce3] dark:border-b-gray-700 last:border-0 transition-all duration-300"
//               >
//                 <td className="p-4 flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//                     <img src={course?.thumbnail} alt="Course Thumbnail" />
//                   </div>
//                   <div>
//                     <p className="font-semibold capitalize">{course?.title}</p>
//                     <p className="text-sm text-gray-500">{course?.category?.name}</p>
//                   </div>
//                 </td>
//                 <td className="p-4 capitalize text-gray-600 text-sm">
//                   {course?.instructor?.lastName} {course?.instructor?.firstName}
//                 </td>
//                 <td className="p-4 capitalize text-gray-600 text-sm">${course?.price}</td>
//                 <td className="p-3">
//                   <Link href={`/dashboard/courses/${course.id}`}>
//                     <span className="text-gray-600 hover:text-blue-600 text-sm hover:underline cursor-pointer">
//                       View Details
//                     </span>
//                   </Link>
//                 </td>
//                 <td className="p-4 flex gap-3">
//                   <button className="px-3 text-blue-500 text-xl hover:scale-110 cursor-pointer">
//                     <LuNotebookPen />
//                   </button>
//                   <button
//                     className="px-3 text-red-500 text-xl hover:scale-110 cursor-pointer"
//                     onClick={() => handleDelete(course.id)}
//                   >
//                     <LuTrash2 />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="p-4 text-center" colSpan="5">
//                 No courses found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CourseListTable;

"use client";
import React, { useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";
import { LuNotebookPen, LuTrash2 } from "react-icons/lu";
import Link from "next/link";

function CourseListTable() {
  const { courses, getCourses, removeCourse, loading, error } =
    useCourseStore();

  useEffect(() => {
    getCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await removeCourse(courseId);
      await getCourses(); // Refresh course list after deletion
    } catch (err) {
      alert("Failed to delete course. Please try again.");
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left bg-[var(--background-tertiary)] shadow-md rounded-lg">
        <thead className="bg-[var(--background-tertiary)] border-b">
          <tr>
            <th className="p-4">Course Name</th>
            <th className="p-4">Instructor</th>
            <th className="p-4">Price</th>
            <th className="p-4">View</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr
                key={course.id}
                className="bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] hover:bg-[var(--background-secondary)] dark:hover:bg-[var(--background-secondary)] border-b-[1px] border-b-[#dcdce3] dark:border-b-gray-700 last:border-0 transition-all duration-300"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={course?.thumbnail} alt="Course Thumbnail" />
                  </div>
                  <div>
                    <p className="font-semibold capitalize">{course?.title}</p>
                    <p className="text-sm text-gray-500">
                      {course?.category?.name}
                    </p>
                  </div>
                </td>
                <td className="p-4 capitalize text-gray-600 text-sm">
                  {course?.instructor?.lastName} {course?.instructor?.firstName}
                </td>
                <td className="p-4 capitalize text-gray-600 text-sm">
                  ${course?.price}
                </td>
                <td className="p-3">
                  <Link href={`/dashboard/courses/${course.id}`}>
                    <span className="text-gray-600 hover:text-blue-600 text-sm hover:underline cursor-pointer">
                      View Details
                    </span>
                  </Link>
                </td>
                <td className="p-4 flex gap-3">
                  <Link
                    href={`/dashboard/courses/${course.id}/edit`}
                    className="px-3 text-blue-500 text-xl hover:scale-110 cursor-pointer"
                  >
                    <LuNotebookPen />
                  </Link>
                  <button
                    className="px-3 text-red-500 text-xl hover:scale-110 cursor-pointer"
                    onClick={() => handleDelete(course.id)}
                  >
                    <LuTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center" colSpan="5">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseListTable;
