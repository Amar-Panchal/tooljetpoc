/** @format */

import React, { Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import config from "config";
import { BrowserRouter, Route } from "react-router-dom";
import { history } from "@/_helpers";
import { PrivateRoute } from "@/_components";
import { Viewer } from "@/Editor";
import { lt } from "semver";
import Toast from "@/_ui/Toast";
import "@/_styles/theme.scss";
import "emoji-mart/css/emoji-mart.css";
import { AppLoader } from "@/AppLoader";
import { RegistrationPage } from "../Editor/RegistrationPage/RegistrationPage";
import PatientDetails from "../Editor/PatientDetails/PatientDetails";
import ResultPage from "../Editor/ResultPage/ResultPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchedMetadata: false,
      darkMode: localStorage.getItem("darkMode") === "true",
    };
  }

  fetchMetadata = () => {
    if (this.state.currentUser) {
      tooljetService.fetchMetaData().then((data) => {
        localStorage.setItem("currentVersion", data.installed_version);
        if (
          data.latest_version &&
          lt(data.installed_version, data.latest_version) &&
          data.version_ignored === false
        ) {
          this.setState({ updateAvailable: true });
        }
      });
    }
  };

  componentDidMount() {}

  logout = () => {
    history.push("/login");
  };

  switchDarkMode = (newMode) => {
    this.setState({ darkMode: newMode });
    localStorage.setItem("darkMode", newMode);
  };

  render() {
    const { updateAvailable, darkMode } = this.state;
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
            {updateAvailable && (
              <div className="alert alert-info alert-dismissible" role="alert">
                <h3 className="mb-1">Update available</h3>
                <p>A new version of ToolJet has been released.</p>
                <div className="btn-list">
                  <a
                    href="https://docs.tooljet.io/docs/setup/updating"
                    target="_blank"
                    className="btn btn-info"
                    rel="noreferrer"
                  >
                    Read release notes & update
                  </a>
                  <a
                    onClick={() => {
                      tooljetService.skipVersion();
                      this.setState({ updateAvailable: false });
                    }}
                    className="btn"
                  >
                    Skip this version
                  </a>
                </div>
              </div>
            )}

            <PrivateRoute
              exact
              path="/"
              component={AppLoader}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            <Route
              path="/registration-page"
              component={RegistrationPage}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            <Route path="/patient-details" component={PatientDetails} />
            <Route path="/result" component={ResultPage} />

            <PrivateRoute
              exact
              path="/applications/:id/versions/:versionId"
              component={Viewer}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
            <PrivateRoute
              exact
              path="/applications/:slug/:pageHandle?"
              component={Viewer}
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
