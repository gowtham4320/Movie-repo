import { trailerActionTypes } from "../../../@types/redux/actions/trailer/trailerActionType";

export const getMovieTrailer = (movieId: string,language:string,type:string) => {
  return {
    type: trailerActionTypes.GET_TRAILER,
    payload: {movieId,language,type},
  };
};

export const clearTrailer = () => {
  return {
    type: trailerActionTypes.CLEAR_TRAILERS,
  };
};
