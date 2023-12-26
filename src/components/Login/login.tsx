import React from 'react'
import './login.styl'
import LoginForm from './loginForm'
import logo from '../../assets/images/Infosys2.png'
import RegisterUser from '../Registration/registerUser'
import { Avatar } from '@mui/material'
import { useAppDispatch, useAppSelector} from '../../Redux/Store/Hooks'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { snackBarText } from '../../Redux/Actions/snackbar/snackbarAction'
import { SubmissionError } from 'redux-form'
import { submitAction } from '../../Redux/Actions/Login/loginActions'
import { popularList } from '../../Redux/Actions/movies/moviesAction'

export default function Login() {
    const [signup, setsignup] = React.useState<boolean>(false)
    const dispatch=useAppDispatch()
    const {result}=useAppSelector((state)=>state.login)
    const navigate = useNavigate()

    const SignUp = () => {
        setsignup(!signup)

    }

    const loginSubmit = async (values: { [key: string]: string }) => {
        //dispatch(popularList())
        if(values.username==="admin"&&values.password==="admin"){
            dispatch({
                type: 'FETCH_USER_SUCCESS',
                payload: {}
            })
            dispatch(snackBarText("Success", "Login Success !"))
            navigate('/home')
        }
        else{
        dispatch(submitAction({ ...values, expiresIn: 60000 }))
        // await axios
        //     .post("https://www.melivecode.com/api/login", { ...values, expiresIn: 60000 })
        //     .then((res) => {
        //         if (res.data.status === "ok") {
        //             dispatch(snackBarText("Success","Login Success !"))
        //             navigate('/home')
        //         }
        //     }
        //     ).catch((err) => {
        //         dispatch(snackBarText("Failure", "Login Failed !"))
        //         throw new SubmissionError({
        //             _error:"Incorrect Username or Password"
        //         })
        //     })
        }
    }
    const signUpSubmit = async (values: object) => {
        //dispatch(popularList())
        dispatch(submitAction({ ...values }))
        // await axios
        //     .post("https://www.melivecode.com/api/login", { ...values, expiresIn: 60000 })
        //     .then((res) => {
        //         if (res.data.status === "ok") {
        //             dispatch(snackBarText("Success", "Registration Success !"))
        //             navigate('/home')
        //         }
        //     }
        //     ).catch((err) => {
        //         dispatch(snackBarText("Failure", "Registration Failed !"))
        //         throw new SubmissionError({
        //             _error: "Registration Failed!"
        //         })
        //     })
    }
    React.useEffect(()=>{
        console.log(result,"21313")
        if(result){
            navigate("/home")
        }
    },[result])

    return (
        <div className='main'>
            <div className='images'>
                {/* <img src={office} width={200} height={70} /> */}
            </div>
            <div className={signup === false ? 'sign in' : 'sign up'}>
                <div ><img src={logo} className='logo' /></div>
                <div style={{ display: signup === false ? "block" : "none" }}><Avatar className='avatar' /></div>
                <div className='loginForm'>
                    {!signup ? <LoginForm onSubmit={loginSubmit} /> : <RegisterUser onSubmit={signUpSubmit}/>}
                </div>
                <span className='signUpMsg'>{signup ? "Already have a account" : "Don't have a account"} <span onClick={SignUp} className='signUpButton'>{signup ? "Sign-In!" : "Sign-Up!"}</span></span>
            </div>
        </div>
    )
}