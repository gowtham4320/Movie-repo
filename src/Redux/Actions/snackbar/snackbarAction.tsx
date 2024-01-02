import { snackbarActionTypes } from "../../../@types/redux/actions/snackbar/snackbarActionTypes";
import { snackBar } from "../../../App";

export const snackBarText = (status:snackbarActionTypes,text:string) => {
    return async (dispatch: any) => {
       snackBar(status)
    dispatch({ type:status, payload:text })
   
    }
};
