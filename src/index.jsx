/** @format */

import React from "react";
import { render } from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { createBrowserHistory } from "history";
import { App } from "./App";
// eslint-disable-next-line import/no-unresolved
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import PatientDetails from "./Editor/PatientDetails/PatientDetails";

const AppWithProfiler = Sentry.withProfiler(App);

const language = "en";
const path = "/";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    fallbackLng: "en",
    lng: language,
    backend: {
      loadPath: `${path}assets/translations/{{lng}}.json`,
    },
  });
// appService.getConfig().then((config) => {
//   window.public_config = config;
//   const language = config.LANGUAGE || "en";
//   const path = config?.SUB_PATH || "/";
//   i18n
//     .use(Backend)
//     // .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//       load: "languageOnly",
//       fallbackLng: "en",
//       lng: language,
//       backend: {
//         loadPath: `${path}assets/translations/{{lng}}.json`,
//       },
//     });

// if (window.public_config.APM_VENDOR === 'sentry') {
//   const history = createBrowserHistory();
//   const tooljetServerUrl = window.public_config.TOOLJET_SERVER_URL;
//   const tracingOrigins = ['localhost', /^\//];
//   const releaseVersion = window.public_config.RELEASE_VERSION
//     ? `tooljet-${window.public_config.RELEASE_VERSION}`
//     : 'tooljet';

//   if (tooljetServerUrl) tracingOrigins.push(tooljetServerUrl);

//   Sentry.init({
//     dsn: window.public_config.SENTRY_DNS,
//     debug: !!window.public_config.SENTRY_DEBUG,
//     release: releaseVersion,
//     integrations: [
//       new Integrations.BrowserTracing({
//         routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
//         tracingOrigins: tracingOrigins,
//       }),
//     ],
//     tracesSampleRate: 0.5,
//   });
// }
// });
render(<AppWithProfiler />, document.getElementById("app"));

export { PatientDetails };
