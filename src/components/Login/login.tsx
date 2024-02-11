import React from "react";
import "./login.styl";
import LoginForm from "./loginForm";
import RegisterUser from "../Registration/registerUser";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Hooks";
import { useNavigate } from "react-router-dom";
//import { snackBarText } from "../../Redux/Actions/snackbar/snackbarAction";
import { loginStartAction } from "../../Redux/Actions/Login/loginActions";
//import { snackbarActionTypes } from "../../@types/redux/actions/snackbar/snackbarActionTypes";
import logo from "../../assets/images/Web capture_5-1-2024_191259_looka.com.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [signup, setsignup] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { result } = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  const SignUp = () => {
    setsignup(!signup);
  };

  const loginSubmit = async (values: { [key: string]: string }) => {
    //dispatch(popularList())
    if (values.username === "admin" && values.password === "admin") {
      dispatch({
        type: "FETCH_USER_SUCCESS",
        payload: {},
      });
      // dispatch(snackBarText(snackbarActionTypes.SUCCESS, "Login Success !"))
      navigate("/home");
    } else {
      dispatch(loginStartAction({ ...values, expiresIn: 60000 }));
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
  };
  const signUpSubmit = async (values: object) => {
    dispatch(loginStartAction({ ...values }));
  };
  React.useEffect(() => {
    if (result) {
      navigate("/home");
    }
  }, [result]);

  return (
    <div className="main">
      <div className="images"></div>
      <div className={signup === false ? "sign in" : "sign up"}>
        <div>
          <img src={logo} className="logo" />
        </div>
        <div className="wrapper">
          <div className="wrapper_form">
            {!signup ? (
              <LoginForm onSubmit={loginSubmit} />
            ) : (
              <RegisterUser onSubmit={signUpSubmit} />
            )}
          </div>
          <span className="signUpMsg">
            {signup ? "Already have a account" : "Don't have a account"}{" "}
            <span onClick={SignUp} className="signUpButton">
              {signup ? "Sign-In!" : "Sign-Up!"}
            </span>
          </span>
            <div
              style={{
                borderTop: "1px solid",
                borderColor: "lightgray",
                width: "102%",
                marginLeft: "-0.1vw",
              }}
            >
              <div style={{ marginLeft: "110px", marginTop: "15px" }}>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    jwtDecode(credentialResponse.credential || "")
                      ? dispatch({
                          type: "FETCH_USER_SUCCESS",
                          payload: {},
                        })
                      : null;
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape="pill"
                  size="large"
                  type="icon"
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
