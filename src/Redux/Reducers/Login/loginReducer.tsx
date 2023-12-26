import { ActionTypes } from "../../Actions/Login/loginActionTypes";

const initialState = {
    loading: false,
    result: false,
    error: "",
};

export const loginReducer = (state = initialState, { type, payload }:any) => {
    console.log("login Reducer")
    switch (type) {

        case ActionTypes.FETCH_SUCCESS:
            return { ...state, loading: false, result:true,userData:payload, error: false };
        case ActionTypes.FETCH_FAILURE:
            return { ...state, loading: false, error: true, result:false };
        case "LOGOUT":
            return { ...state,...initialState };
        default:
            return state
    }
}