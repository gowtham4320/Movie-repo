import { loginActionTypes } from "../../../@types/redux/actions/login/loginActionTypes"

export const loginStartAction = (data:object) => ({
    type: loginActionTypes.LOGIN_START,
    payload:data
})

export const loginSucessAction = (data:object) => ({
    type: loginActionTypes.LOGIN_SUCCESS,
    payload:data
})

export const loginFailAction = (data:object) => ({
    type: loginActionTypes.LOGIN_FAILURE,
    payload:data
})

export const logoutAction = () => ({
    type: loginActionTypes.LOGOUT,
})
