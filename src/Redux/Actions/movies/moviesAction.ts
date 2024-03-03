import { movieActionTypes } from "../../../@types/redux/actions/movies/movieActionTypes";

export const popularList = () => {
  return {
    type: movieActionTypes.TRENDING,
  };
};

export const searchMovie = (searchQuery: string) => {
  return {
    type: movieActionTypes.SEARCH,
    payload: searchQuery,
  };
};
