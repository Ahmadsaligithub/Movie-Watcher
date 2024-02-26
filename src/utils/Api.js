import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params: {
        ...params,
        api_key: TMDB_TOKEN,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
