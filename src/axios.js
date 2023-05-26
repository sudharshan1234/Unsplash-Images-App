import axios from "axios";

export const customFetch = axios.create({
  baseURL: "https://api.unsplash.com",
});

customFetch.interceptors.request.use(
  (request) => {
    console.log(request);
    request.url = `${request.url}&client_id=${import.meta.env.VITE_API_KEY}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
