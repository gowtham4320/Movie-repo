import { loginActionTypes } from "../../../@types/redux/actions/login/loginActionTypes";

const initialState = {
  loading: false,
  result: false,
  error: "",
};

interface actionPayload {
  type: loginActionTypes;
  payload: object;
}

export const loginReducer = (
  state = initialState,
  { type, payload }: actionPayload
) => {
  switch (type) {
    case loginActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        result: true,
        userData: payload,
        error: false,
      };
    case loginActionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: true, result: false };
    case loginActionTypes.LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
