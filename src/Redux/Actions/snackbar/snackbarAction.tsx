import { snackBar } from "../../../App";

export const snackBarText = (status:string,text:string) => {
    return async (dispatch: any) => {
       snackBar(status)
    dispatch({ type:status, payload:text })
   
    }
};
