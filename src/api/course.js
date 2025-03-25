import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Fetch all courses
export const fetchCourses = async () => {
  try {
    const res = await axios.get(`${API_URL}/courses/listCourses`, {
      headers: { Authorization: `${getToken()}` },
    });
    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};

// Fetch course by ID
export const fetchCourseById = async (courseId) => {
  try {
    const res = await axios.get(
      `${API_URL}/courses/getCourseDetails/${courseId}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch course");
  }
};

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const res = await axios.post(
      `${API_URL}/admin/adminCreateCourse`,
      courseData,
      {
        headers: {
          Authorization: `${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};

// Update a course
export const updateCourse = async (courseId, updatedData) => {
  try {
    const res = await axios.put(
      `${API_URL}/courses/updateCourse/${courseId}`,
      updatedData,
      {
        headers: {
          Authorization: `${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};

// Delete a course

export const deleteCourse = async (courseId) => {
  try {
    const token = getToken();
    if (!token) throw new Error("Unauthorized: No token found");

    const res = await axios.delete(
      `${API_URL}/courses/deleteCourse/${courseId}`,
      {
        headers: { Authorization: token },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};

// Fetch all videos from a specific course
export const fetchCourseVideos = async (courseId) => {
  try {
    const res = await axios.get(
      `${API_URL}/courses/getCourseVideos/${courseId}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch course videos"
    );
  }
};

// Fetch a specific video by ID
export const fetchCourseVideoById = async (videoId) => {
  try {
    const res = await axios.get(
      `${API_URL}/courses/getVideoDetails/${videoId}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch course video"
    );
  }
};

// Add a new video to a course
export const createCourseVideo = async (courseId, videoData) => {
  console.log("Video Data :", videoData);
  try {
    const res = await axios.put(
      `${API_URL}/courses/manageVideos/${courseId}`,
      videoData,
      {
        headers: {
          Authorization: `${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);

    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update course video"
    );
  }
};

// Update a specific video
export const updateCourseVideo = async (videoId, updatedData) => {
  try {
    const res = await axios.put(
      `${API_URL}/videos/updateVideo/${videoId}`,
      updatedData,
      {
        headers: {
          Authorization: `${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update course video"
    );
  }
};

// Delete a specific video
export const deleteCourseVideo = async (videoId) => {
  try {
    const res = await axios.delete(`${API_URL}/videos/deleteVideo/${videoId}`, {
      headers: { Authorization: `${getToken()}` },
    });

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete course video"
    );
  }
};
