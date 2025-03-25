"use client";

import React, { useState } from "react";
import CourseListTable from "@/components/courses/CourseListTable";
import CreateCourse from "@/components/courses/CreateCourse";

function Courses() {
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="p-3 bg-green-400 text-white rounded-lg font-semibold cursor-pointer"
          onClick={() => setIsCreateCourseOpen(true)}
        >
          Add New Course
        </button>
      </div>
      <div className="pt-4">
        <CourseListTable />
      </div>

      {isCreateCourseOpen && (
        <CreateCourse setIsCreateCourseOpen={setIsCreateCourseOpen} />
      )}
    </div>
  );
}

export default Courses;
