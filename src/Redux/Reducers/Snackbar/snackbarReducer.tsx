import { snackbarActionTypes } from "../../../@types/redux/actions/snackbar/snackbarActionTypes";

const initialState = {
  snackBarText: "",
};

interface actionPayload {
  type: snackbarActionTypes;
  payload: string;
}

export const snackBarReducer = (
  state = initialState,
  { type, payload }: actionPayload
) => {
  switch (type) {
    case snackbarActionTypes.SUCCESS:
      return { ...state, snackBarText: payload ?? "" };
    case snackbarActionTypes.FAILURE:
      return { ...state, snackBarText: payload ?? "" };
    default:
      return state;
  }
};
