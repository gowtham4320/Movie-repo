const initialState = {
  movieList: [],
  error: false,
  searchQuery: "",
};

export const movieReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case "MOVIE_LIST":
      return { ...state, movieList: payload };

    case "MOVIE_SEARCHED_FAILURE":
      return { ...state, error: true };

    default:
      return state;
  }
};
