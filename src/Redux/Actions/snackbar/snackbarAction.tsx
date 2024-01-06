import { snackbarActionTypes } from "../../../@types/redux/actions/snackbar/snackbarActionTypes";
import { snackBar } from "../../../components/Snackbar/snackbar";

export const snackBarText = (status: snackbarActionTypes, text: string) => {
  snackBar(status);
  return { type: status, payload: text };
};
