import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import { loginReducer } from "../Reducers/Login/loginReducer";
import { snackBarReducer } from "../Reducers/Snackbar/snackbarReducer";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import loginEpic from "../Epics/loginEpic";
import movieEpic from "../Epics/movieEpic";
import { movieReducer } from "../Reducers/Movies/moviesReducer";
import trailerEpic from "../Epics/trailerEpic";
import { trailersReducer } from "../Reducers/Trailer/trailer.reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducer = combineReducers({
  login: loginReducer,
  snackbar: snackBarReducer,
  movies: movieReducer,
  trailers: trailersReducer,
  form: reduxFormReducer,
});
const epics = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;
const Store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk, epics))
);
const allEpics = combineEpics(loginEpic, movieEpic, trailerEpic);
epics.run(allEpics);
export default Store;
export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
