import { trailerActionTypes } from "../../../@types/redux/actions/trailer/trailerActionType";

export const getMovieTrailer = (movieId: string) => {
  return {
    type: trailerActionTypes.GET_TRAILER,
    payload: movieId,
  };
};

export const clearTrailer = () => {
  return {
    type: trailerActionTypes.CLEAR_TRAILERS,
  };
};
