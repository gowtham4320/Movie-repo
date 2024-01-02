import { from, of } from "rxjs";
import axios from "axios";
import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { snackBarText } from "../Redux/Actions/snackbar/snackbarAction";
import Store from "../Redux/Store/Store";
import { popularList } from "../Redux/Actions/movies/moviesAction";

async function submitToServer(data: object) {
  try {
    const response = axios.post("https://www.melivecode.com/api/login", {
      ...data,
      expiresIn: 60000,
    });
    return await response;
  } catch (error: any) {
    throw new Error(error);
  }
}

const loginEpic = (action$: any, { getState, dispatch }: any) =>
  action$.pipe(
    ofType("REQUEST_SUBMIT"),
    mergeMap((action: any) =>
      from(submitToServer(action.payload)).pipe(
        map((res: any) => {
          console.log(res);
          Store.dispatch(
            snackBarText(
              "Success",
              action.payload.expiresIn
                ? "Login Success !"
                : "Registration Success !"
            )
          );
          Store.dispatch(popularList());
          return {
            type: "FETCH_USER_SUCCESS",
            payload: res.data,
          };
        }),
        catchError((error) =>
          of(error).pipe(
            map((res: any) => {
              console.log(res);
              Store.dispatch(
                snackBarText(
                  "Failure",
                  action.payload.expiresIn
                    ? "Login Failed !"
                    : "Registration Failed !"
                )
              );
              return {
                type: "FETCH_USER_FAILURE",
                payload: error.message,
                error: true,
              };
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

export default loginEpic;
