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
import loginEpic from "../../Epics/loginEpic";
import movieEpic from "../../Epics/movieEpic";
import { movieReducer } from "../Reducers/Movies/moviesReducer";
import movieSearchedEpic from "../../Epics/movieSearched";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducer = combineReducers({
  login: loginReducer,
  snackbar: snackBarReducer,
  movies: movieReducer,
  form: reduxFormReducer,
});
const epics = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;
const Store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk, epics))
);
const allEpics = combineEpics(loginEpic, movieEpic, movieSearchedEpic);
epics.run(allEpics);
export default Store;
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
