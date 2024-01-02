import { movieActionTypes } from "../../../@types/redux/actions/movies/movieActionTypes";

export const popularList = () => {
  return {
    type: movieActionTypes.POPULAR_MOVIE,
  };
};

export const searchMovie = (searchQuery: string) => {
  return {
    type: movieActionTypes.SEARCH_MOVIE,
    payload: searchQuery,
  };
};
