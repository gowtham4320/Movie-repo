import axios from "axios";
import { loginActionTypes } from "../../../@types/redux/actions/login/loginActionTypes";

export const loginAuth = (values:any) =>{ return async (dispatch:any) => {
    await axios
        .post("https://gowthamsample.free.beeceptor.com/loginAuth", { userName: "john_doe", password: "admin" })
        .then((res) =>{
            dispatch({ type: loginActionTypes.FETCH_SUCCESS, payload: res.data })
        }
        )
        .catch((err) =>
            dispatch({ type: loginActionTypes.FETCH_FAILURE, payload: err.message })
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
