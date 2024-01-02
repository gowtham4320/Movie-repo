import { movieActionTypes } from "../../../@types/redux/actions/movies/movieActionTypes";

const initialState = {
  movieList: [],
  error: false,
  searchQuery: "",
};

interface actionPayload {
  type:movieActionTypes,
  payload:object
}

export const movieReducer = (state = initialState, { type, payload }: actionPayload) => {
  switch (type) {
    case movieActionTypes.MOVIE_LIST:
      return { ...state, movieList: payload };

    case movieActionTypes.MOVIE_SEARCHED_FAILURE:
      return { ...state, error: true };

    default:
      return state;
  }
};
