import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

function customHooks() {
  const apiClient = axios.create({
    baseURL: BACKEND_URL, // Set your baseURL here
  });

  // Add a request interceptor to automatically include the token in headers
  apiClient.interceptors.request.use(
    (config) => {
      // Get the token from localStorage
      const token = localStorage.getItem("quiz_builder");

      // If a token exists, add it to the Authorization header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      // Handle the error
      return Promise.reject(error);
    }
  );

  async function createQuizzes(data) {
    try {
      const res = await apiClient.post("/api/quiz", data);
      // console.log("created Quiz", res.data);
      localStorage.setItem("recent-created-quiz-id", res.data._id);
      if (res.status === 201) {
        return true;
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
      return false;
    }
  }

  async function getMyStats() {
    try {
      const res = await apiClient.get("/api/user/getStats");

      if (res.status === 200) {
        return res.data.data;
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
      return false;
    }
  }

  async function getMyQuizzes() {
    try {
      const res = await apiClient.get("/api/user/getMyQuizzes");
      if (res.status === 200) {
        return res.data.quizzes;
      }
      throw new Error("Failed to retrieve quizzes");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  }

  async function getQuizDetail(id) {
    try {
      const res = await apiClient.get(`/api/quiz/${id}`);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Server error while getting the quiz detail");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  }

  async function deleteQuiz(id) {
    try {
      const res = await apiClient.delete(`/api/quiz/${id}`);
      if (res.status === 200) {
        return true;
      } else {
        throw new Error("Server error while deleting the quiz");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  }

  async function getQuestion(id) {
    console.log("getQuestionById", id);
    try {
      const res = await apiClient.get(`/api/quiz/questions/${id}`);
      console.log("getQuestionById", res);
      if (res.status === 200) {
        return {
          questions: res.data.questions,
          typeOfQuiz: res.data.typeOfQuiz,
        };
      } else {
        throw new Error("Server error while getting the quiz questions");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  }

  async function updateQuestions(data, id) {
    try {
      const res = await apiClient.put(`/api/quiz/questions/${id}`, {
        questions: data,
      });
      if (res.status === 200) {
        return res.data.questions;
      } else {
        throw new Error("Server error while updating the quiz questions");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  }

  async function getTrendingQuiz() {
    try {
      const res = await apiClient.get("/api/user/getTrendingQuiz");
      if (res.status == 201) {
        return res.data.quizzes.sort((a, b) => b.impressions - a.impressions);
      } else {
        throw new Error("Server error while getting trending quizzes");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  }

  return {
    getTrendingQuiz,
    getQuestion,
    createQuizzes,
    apiClient,
    getMyStats,
    getMyQuizzes,
    getQuizDetail,
    deleteQuiz,
    updateQuestions,
  };
}

export default customHooks;
