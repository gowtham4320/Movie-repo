import { from, of } from "rxjs";
import axios from "axios";
import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { movieActionTypes } from "../../@types/redux/actions/movies/movieActionTypes";

async function submitToServer() {
  try {
    const response = axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=8bd650675ecd3ba6656d06a49e5fcc6d"
    );
    return await response;
  } catch (error: any) {
    throw new Error(error);
  }
}

const movieEpic = (action$: any, { getState, dispatch }: any) =>
  action$.pipe(
    ofType(movieActionTypes.POPULAR_MOVIE),
    mergeMap((action: any) =>
      from(submitToServer()).pipe(
        map((res: any) => {
          return {
            type: movieActionTypes.MOVIE_LIST,
            payload: res.data,
          };
        }),
        catchError((error) =>
          of(error).pipe(
            map((res: any) => {
              console.log(res);
              return {
                type: movieActionTypes.MOVIE_SEARCHED_FAILURE,
                payload: error.message,
                error: true,
              };
            })
          )
        )
      )
    )
  );

export default movieEpic;
