import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  switchDarkMode,
  darkMode,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      // authorised so return component
      return (
        <Component
          {...props}
          switchDarkMode={switchDarkMode}
          darkMode={darkMode}
        />
      );
    }}
  />
);

export const AdminRoute = ({
  component: Component,
  switchDarkMode,
  darkMode,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <Component
          {...props}
          switchDarkMode={switchDarkMode}
          darkMode={darkMode}
        />
      );
    }}
  />
);
