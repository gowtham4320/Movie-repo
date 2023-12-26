import axios from "axios";
import { ActionTypes } from "./loginActionTypes";

export const loginAuth = (values:any) =>{ return async (dispatch:any) => {
    await axios
        .post("https://gowthamsample.free.beeceptor.com/loginAuth", { userName: "john_doe", password: "admin" })
        .then((res) =>{
            dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: res.data })
        }
        )
        .catch((err) =>
            dispatch({ type: ActionTypes.FETCH_FAILURE, payload: err.message })
        );
    }
};

export const submitAction = (data:object) => ({
    type: 'REQUEST_SUBMIT',
    payload:data
})

export const logoutAction = () => ({
    type: 'LOGOUT',
})
