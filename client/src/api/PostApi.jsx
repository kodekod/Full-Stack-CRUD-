import axios from "axios";

// CHANGE THIS to your real backend URL
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
// Example for your own backend: "http://localhost:3000/posts"

export const getPost = () => axios.get(BASE_URL);

export const deletePost = (id) => axios.delete(`${BASE_URL}/${id}`);

export const updatePost = (id, payload) =>
  axios.put(`${BASE_URL}/${id}`, payload);

export const createPost = (payload) =>
  axios.post(BASE_URL, payload);  // <-- added POST API
