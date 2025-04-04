"use client";
import Breadcrumb from "@/components/Breadcrumb";
import ButtonComponent from "@/components/ui/Button";
import { useCourseStore } from "@/store/courseStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EditCourseDetails() {
  const {
    course,
    categories,
    getCategories,
    editCourse,
    getCourses,
    getCourseById,
  } = useCourseStore();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    categoryId: "",
    courseContents: [],
  });

  const { courseId } = useParams(); // courseId from extracted from url

  const router = useRouter();

  // loading course categories
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Fetch course on mount
  useEffect(() => {
    if (courseId) {
      getCourseById(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (course) {
      setCourseData({
        title: course?.title,
        description: course?.description,
        thumbnail: course?.thumbnail,
        categoryId: course?.categoryId,
        courseContents: course?.courseContents,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const addCourseContent = () => {
    const updatedCourseContents = [...courseData.courseContents];
    updatedCourseContents.push("");
    setCourseData({ ...courseData, courseContents: updatedCourseContents });
  };

  const handleCourseContentsChange = (index, e) => {
    const updatedCourseContents = [...courseData.courseContents];
    updatedCourseContents[index] = e.target.value;
    setCourseData({ ...courseData, courseContents: updatedCourseContents });
  };

  const removeCourseContent = (index) => {
    const updatedCourseContents = [...courseData.courseContents];
    updatedCourseContents.splice(index, 1);
    setCourseData({ ...courseData, courseContents: updatedCourseContents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCourse(courseId, courseData);
      alert("Course updated successfully!");
      getCourses(); // Refresh course list
      getCourseById(courseId); // Refresh course and videos by id

      router.push(`/dashboard/courses/${courseId}`);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  return (
    <div className="">
      <Breadcrumb />
      <div className="w-1/2">
        <div className="pb-6 max-w-max">
          <ButtonComponent href={`/dashboard/courses/${courseId}`}>
            Back to Course
          </ButtonComponent>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label htmlFor="title" className="font-semibold text-black">
            Course Title :
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
            required
          />

          <label htmlFor="description" className="font-semibold text-black">
            Course Description :
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Course Description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
            rows={3}
            required
          />

          <label htmlFor="thumbnail" className="font-semibold text-black">
            Course Thumbnail :
          </label>
          <input
            id="thumbnail"
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={courseData.thumbnail}
            onChange={handleChange}
            className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
            required
          />

          <label htmlFor="categoryId" className="font-semibold text-black">
            Course Category :
          </label>
          {/* <input
            id="categoryId"
            type="text"
            name="categoryId"
            placeholder="Category ID"
            value={courseData.categoryId}
            onChange={handleChange}
            className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
            required
          /> */}
          <select
            id="categoryId"
            name="categoryId"
            value={courseData.categoryId}
            className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
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

          <label htmlFor="courseContents" className="font-semibold text-black">
            Course Contents :
          </label>
          {courseData.courseContents.length > 0 &&
            courseData.courseContents.map((content, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Course Contents (comma-separated)"
                  value={content}
                  onChange={(e) => handleCourseContentsChange(index, e)}
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl outline-none focus:border-2 focus:border-green-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeCourseContent(index)}
                  className="text-red-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}

          <button
            type="button"
            onClick={addCourseContent}
            className="bg-blue-400 text-white py-2 px-4 rounded-2xl hover:bg-blue-500 cursor-pointer"
          >
            Add Course Content
          </button>
          <br />
          <button
            type="submit"
            className="mt-4 py-2 w-[200px] bg-green-400 text-white  rounded-2xl hover:bg-green-500 cursor-pointer"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCourseDetails;
