import { watchActionTypes } from "../../../@types/redux/actions/watch/watchActionType";


export const watchMovie = (movieId: string) => {
  return {
    type: watchActionTypes.WATCH_NOW,
    payload: {movieId},
  };
};

export const clearWatchList = () => {
  return {
    type: watchActionTypes.CLEAR_WATCH_LIST,
  };
};
