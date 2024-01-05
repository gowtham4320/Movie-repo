import React from "react";
import ReactDOM from "react-dom/client";
import "./index.styl";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";
import { HashRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "rxjs";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Router>
        <GoogleOAuthProvider clientId="259060554514-0un6vg4k58b78lvu0vcfla9i4otshmo1.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Router>
    </React.StrictMode>
  </Provider>
);
