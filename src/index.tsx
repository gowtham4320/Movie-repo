import React from "react";
import ReactDOM from "react-dom/client";
import "./index.styl";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";
import { BrowserRouter as Router } from "react-router-dom";
import "rxjs";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);
