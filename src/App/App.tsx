/** @format */

import React, { Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route } from "react-router-dom";
import { history } from "../_helpers";
import { PrivateRoute } from "../_components";
import { Viewer } from "../Editor";
import Toast from "../_ui/Toast";
import "@/_styles/theme.scss";
import "emoji-mart/css/emoji-mart.css";
import { RegistrationPage } from "../Editor/RegistrationPage/RegistrationPage";
import PatientDetails from "../Editor/PatientDetails/PatientDetails";
import ResultPage from "../Editor/ResultPage/ResultPage";
import { Editor } from "../Editor/Editor";
import TemplateHandler from "../Editor/TemplateHandler/TemplateHandler";
import { TestResultReport } from "../Editor/TestResultReport/TestResultReport";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  switchDarkMode = (newMode) => {
    this.setState({ darkMode: newMode });
    localStorage.setItem("darkMode", newMode);
  };

  render() {
    const { darkMode } = this.state;
    let toastOptions = {
      style: {
        wordBreak: "break-all",
      },
    };

    if (darkMode) {
      toastOptions = {
        className: "toast-dark-mode",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          wordBreak: "break-all",
        },
      };
    }

    return (
      <Suspense fallback={null}>
        <BrowserRouter
          history={history}
          basename={window.public_config?.SUB_PATH || "/"}
        >
          <div
            className={`main-wrapper ${darkMode ? "theme-dark" : ""}`}
            data-cy="main-wrapper"
          >
            <PrivateRoute
              exact
              path="/editor"
              component={Editor}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            <PrivateRoute
              exact
              path="/"
              component={PatientDetails}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            <Route
              path="/registration-page"
              component={RegistrationPage}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            {/* <Route path="/patient-details" component={PatientDetails} /> */}
            <Route path="/custom-report" component={TemplateHandler} />
            <Route path="/result" component={ResultPage} />

            <PrivateRoute
              exact
              path="/preview"
              component={Viewer}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            <PrivateRoute
              exact
              path="/test-result-report"
              component={TestResultReport}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
          </div>
        </BrowserRouter>

        <Toast toastOptions={toastOptions} />
      </Suspense>
    );
  }
}

export { App };
