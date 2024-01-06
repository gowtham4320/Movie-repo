import { useState } from "react";
import "./App.styl";
import axios from "axios";
import { Backdrop, Stack } from "@mui/material";
import AppRoute from "./Routes/Routes";
import { useAppSelector } from "./Redux/Store/Hooks";

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { snackBarText } = useAppSelector((state) => state.snackbar);
  axios.defaults.timeout = 30000;
  axios.interceptors.request.use(
    function (config) {
      setLoading(true);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (config) {
      setLoading(false);
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );
  return (
    <>
      <div className="App">
        <AppRoute />
        <div className="snackbar">{snackBarText}</div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
        <Stack gap={1} justifyContent="center" alignItems="center">
          <div className="loader"></div>
          {/* <div className='loadingtext'>Loading...</div> */}
        </Stack>
      </Backdrop>
    </>
  );
}
