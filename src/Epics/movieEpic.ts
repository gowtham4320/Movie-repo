import { from, of } from "rxjs";
import axios from "axios";
import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";

async function submitToServer() {
  try {
    const response = axios.get(
      "http://api.themoviedb.org/3/movie/popular?api_key=8bd650675ecd3ba6656d06a49e5fcc6d"
    );
    return await response;
  } catch (error: any) {
    throw new Error(error);
  }
}

const movieEpic = (action$: any, { getState, dispatch }: any) =>
  action$.pipe(
    ofType("POPULAR_MOVIES"),
    mergeMap((action: any) =>
      from(submitToServer()).pipe(
        map((res: any) => {
          return {
            type: "MOVIE_LIST",
            payload: res.data,
          };
        }),
        catchError((error) =>
          of(error).pipe(
            map((res: any) => {
              console.log(res);
              return {
                type: "MOVIE_SEARCHED_FAILURE",
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
