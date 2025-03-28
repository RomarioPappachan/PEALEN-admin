import { create } from "zustand";
import {
  fetchCourses,
  fetchCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCourseVideos,
  fetchCourseVideoById,
  createCourseVideo,
  updateCourseVideo,
  deleteCourseVideo,
} from "@/api/course";

export const useCourseStore = create((set) => ({
  courses: [],
  course: null,
  videos: [], // Store course videos
  loading: false,
  error: null,

  // Fetch all courses
  getCourses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCourses();
      set({ courses: data.courses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a course by ID
  getCourseById: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCourseById(courseId);
      set({ course: data.course, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch course videos
  loadCourseVideos: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCourseVideos(courseId);
      set({ videos: data.videos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single video by ID
  getCourseVideoById: async (videoId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCourseVideoById(videoId);
      set({ video: data.video, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new course
  addCourse: async (courseData) => {
    set({ loading: true, error: null });
    try {
      const newCourse = await createCourse(courseData);
      set((state) => ({
        courses: [...state.courses, newCourse],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update a course
  editCourse: async (courseId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedCourse = await updateCourse(courseId, updatedData);
      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId ? updatedCourse : course
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a course
  removeCourse: async (courseId) => {
    set({ loading: true, error: null });
    try {
      await deleteCourse(courseId);
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new course video
  addCourseVideo: async (courseId, videoData) => {
    set({ loading: true, error: null });
    try {
      const newVideos = await createCourseVideo(courseId, videoData);
      console.log(newVideos);
      set((state) => ({
        videos: [...state.videos, ...videoData.addVideos],
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update a course video
  editCourseVideo: async (courseId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedVideo = await updateCourseVideo(courseId, updatedData);
      set((state) => ({
        videos: state.videos.map((video) =>
          video.id === updatedData.id ? updatedData : video
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a course video
  removeCourseVideo: async (courseId, videoId) => {
    set({ loading: true, error: null });
    try {
      await deleteCourseVideo(courseId, videoId);
      set((state) => ({
        videos: state.videos.filter((video) => video.id !== videoId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
