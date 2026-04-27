import { watchActionTypes } from "../../../@types/redux/actions/watch/watchActionType";


const initialState = {
  imdb_id: "",
  error: false,
  movieId: "",
};

interface actionPayload {
  type:watchActionTypes,
  payload: {id : string , imdb_id: string}
}

export const watchMovieReducer = (state = initialState, { type, payload }: actionPayload) => {
  switch (type) {
    case watchActionTypes.WATCH_MOVIE_SUCCESS:
      console.log(payload,">>")
      return { ...state, imdb_id: payload.imdb_id, movieId: payload.id };
    
    case watchActionTypes.WATCH_MOVIE_FAILURE:
      return { ...state, ...initialState, error:true };  
    
    case watchActionTypes.CLEAR_WATCH_LIST:
      return {...state, ...initialState}

    default:
      return state;
  }
};
