/** @format */
import { __extends } from "tslib";
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
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.switchDarkMode = function (newMode) {
            _this.setState({ darkMode: newMode });
            localStorage.setItem("darkMode", newMode);
        };
        _this.state = {
            darkMode: false,
        };
        return _this;
    }
    App.prototype.render = function () {
        var _a;
        var darkMode = this.state.darkMode;
        var toastOptions = {
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
        return (React.createElement(Suspense, { fallback: null },
            React.createElement(BrowserRouter, { history: history, basename: ((_a = window.public_config) === null || _a === void 0 ? void 0 : _a.SUB_PATH) || "/" },
                React.createElement("div", { className: "main-wrapper ".concat(darkMode ? "theme-dark" : ""), "data-cy": "main-wrapper" },
                    React.createElement(PrivateRoute, { exact: true, path: "/editor", component: Editor, switchDarkMode: this.switchDarkMode, darkMode: darkMode }),
                    React.createElement(PrivateRoute, { exact: true, path: "/", component: PatientDetails, switchDarkMode: this.switchDarkMode, darkMode: darkMode }),
                    React.createElement(Route, { path: "/registration-page", component: RegistrationPage, switchDarkMode: this.switchDarkMode, darkMode: darkMode }),
                    React.createElement(Route, { path: "/custom-report", component: TemplateHandler }),
                    React.createElement(Route, { path: "/result", component: ResultPage }),
                    React.createElement(PrivateRoute, { exact: true, path: "/preview", component: Viewer, switchDarkMode: this.switchDarkMode, darkMode: darkMode }),
                    React.createElement(PrivateRoute, { exact: true, path: "/test-result-report", component: TestResultReport, switchDarkMode: this.switchDarkMode, darkMode: darkMode }))),
            React.createElement(Toast, { toastOptions: toastOptions })));
    };
    return App;
}(React.Component));
export { App };
//# sourceMappingURL=App.js.map