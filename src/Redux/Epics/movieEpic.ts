import { from, of } from "rxjs";
import axios from "axios";
import { combineEpics, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { movieActionTypes } from "../../@types/redux/actions/movies/movieActionTypes";

async function submitToServer() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=8bd650675ecd3ba6656d06a49e5fcc6d"
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function search(searchQuery: string) {
  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: searchQuery,
        include_adult: "false",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmQ2NTA2NzVlY2QzYmE2NjU2ZDA2YTQ5ZTVmY2M2ZCIsInN1YiI6IjY1MWUzY2Y1NzQ1MDdkMDBjNTdhMDEzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDsjRWcqppVw5wc_7FtAmDM4l5_G3kZzDV06oN0S3nc",
      },
    };
    const response = axios.request(options);
    return await response;
  } catch (error: any) {
    throw new Error(error);
  }
}

const trendingEpic = (action$: any, { getState, dispatch }: any) =>
  action$.pipe(
    ofType(movieActionTypes.TRENDING),
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
                type: movieActionTypes.SEARCH_FAILURE,
                payload: error.message,
                error: true,
              };
            })
          )
        )
      )
    )
  );

const movieSearchedEpic = (action$: any, { getState, dispatch }: any) =>
  action$.pipe(
    ofType(movieActionTypes.SEARCH),
    mergeMap((action: any) =>
      from(search(action.payload)).pipe(
        map((res: any) => {
          //const filterCollection = res.data.results.filter((collection:any)=> collection.video === undefined)
          return {
            type: movieActionTypes.MOVIE_LIST,
            payload: res.data
          };
        }),
        catchError((error) =>
          of(error).pipe(
            map((res: any) => {
              console.log(res);
              return {
                type: movieActionTypes.SEARCH_FAILURE,
                payload: error.message,
                error: true,
              };
            })
          )
        )
      )
    )
  );
const movieEpic = combineEpics(trendingEpic, movieSearchedEpic);
export default movieEpic;
