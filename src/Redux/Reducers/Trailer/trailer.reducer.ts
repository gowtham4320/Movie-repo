import { trailerActionTypes } from "../../../@types/redux/actions/trailer/trailerActionType";


const initialState = {
  trailerList: [],
  error: false,
  movieId: "",
};

interface actionPayload {
  type:trailerActionTypes,
  payload: {id : string , results: any}
}

export const trailersReducer = (state = initialState, { type, payload }: actionPayload) => {
  switch (type) {
    case trailerActionTypes.GET_TRAILER_SUCCESS:
      return { ...state, trailerList: payload.results, movieId: payload.id };
    
    case trailerActionTypes.CLEAR_TRAILERS:
      return {...state, ...initialState}

    default:
      return state;
  }
};
