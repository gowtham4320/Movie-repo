import { from, of } from "rxjs";
import axios from "axios";
import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { trailerActionTypes } from "../../@types/redux/actions/trailer/trailerActionType";

async function submitToServer({movieId,language,type}:any) {
  console.log(movieId,">>>>")
    try {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/"+type+"/"+movieId+"/videos?language="+language,
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

const trailerEpic = (action$: any) =>
  action$.pipe(
    ofType(trailerActionTypes.GET_TRAILER),
    mergeMap((action: any) =>
      from(submitToServer(action.payload)).pipe(
        map((res: any) => {
          return {
            type: trailerActionTypes.GET_TRAILER_SUCCESS,
            payload: res.data,
          }
        }),
        catchError((error) =>
          of(error).pipe(
            map((res: any) => {
              return {
                type : trailerActionTypes.GET_TRAILER_FAILURE
              }
            })
          )
        )
      )
    ),
    catchError((error) =>
      of(error).pipe(
        map((res: any) => {
          console.log("error>>>>>>>>>>>>>>>>>>>>>>>>");
        })
      )
    )
  );

export default trailerEpic;
