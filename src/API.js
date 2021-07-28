import axios from "axios";

export function getMovie(query) {
  return axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "85b92555d5d79edefc1c4cab71c6f398",
      query: query,
    },
  });
}
