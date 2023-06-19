/** @format */

import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Button as KendoButton } from "@progress/kendo-react-all";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
var tinycolor = require("tinycolor2");

export const Button = function Button(props) {
  const {
    height,
    properties,
    styles,
    fireEvent,
    registerAction,
    id,
    dataCy,
    customMode,
    mode,
  } = props;
  const {
    backgroundColor,
    textColor,
    borderRadius,
    loaderColor,
    disabledState,
    borderColor,
  } = styles;
  const [label, setLabel] = useState(properties.text);
  const [disable, setDisable] = useState(disabledState);
  const [visibility, setVisibility] = useState(styles.visibility);
  const [loading, setLoading] = useState(properties.loadingState);
  const history = useHistory();
  useEffect(() => setLabel(properties.text), [properties.text]);

  useEffect(() => {
    disable !== disabledState && setDisable(disabledState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledState]);

  useEffect(() => {
    visibility !== styles.visibility && setVisibility(styles.visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styles.visibility]);

  useEffect(() => {
    loading !== properties.loadingState && setLoading(properties.loadingState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.loadingState]);

  const computedStyles = {
    backgroundColor,
    color: textColor,
    width: "100%",
    borderRadius: `${borderRadius}px`,
    height,
    display: visibility ? "" : "none",
    "--tblr-btn-color-darker": tinycolor(backgroundColor).darken(8).toString(),
    "--loader-color": tinycolor(loaderColor ?? "#fff").toString(),
    borderColor: borderColor,
  };

  registerAction(
    "click",
    async function () {
      if (!disable) {
        fireEvent("onClick");
      }
    },
    [disable]
  );

  registerAction(
    "setText",
    async function (text) {
      setLabel(text);
    },
    [setLabel]
  );

  registerAction(
    "disable",
    async function (value) {
      setDisable(value);
    },
    [setDisable]
  );

  registerAction(
    "visibility",
    async function (value) {
      setVisibility(value);
    },
    [setVisibility]
  );

  registerAction(
    "loading",
    async function (value) {
      setLoading(value);
    },
    [setLoading]
  );

  const hasCustomBackground = backgroundColor.charAt() === "#";
  if (hasCustomBackground) {
    computedStyles["--tblr-btn-color-darker"] = tinycolor(backgroundColor)
      .darken(8)
      .toString();
  }

  const handleClick = () => {
    if (
      props.component.name === "submit" &&
      customMode !== "preview" &&
      mode !== "edit"
    )
      props.onSubmitPatientRegistrationFormData();
    if (
      props.component.name === "cancel" &&
      customMode !== "preview" &&
      mode !== "edit"
    ) {
      props.setPatientRegistrationFormData({});
      history.push({
        pathname: "/registration-page",
        state: {},
      });
      window.location.reload();
    }
    if (
      props.component.name === "button4" &&
      customMode !== "preview" &&
      mode !== "edit"
    ) {
      history.push({
        pathname: "/",
        state: {},
      });
    }
    const event1 = new CustomEvent("submitForm", {
      detail: { buttonComponentId: id },
    });
    document.dispatchEvent(event1);
    fireEvent("onClick");
  };

  return (
    <div className="widget-button">
      <KendoButton
        disabled={disable}
        className={cx("jet-button btn btn-primary p-1 overflow-hidden", {
          "btn-loading": loading,
          "btn-custom": hasCustomBackground,
        })}
        style={computedStyles}
        onClick={handleClick}
        onMouseOver={() => {
          fireEvent("onHover");
        }}
        data-cy={dataCy}
        type="default"
      >
        {label}
      </KendoButton>
    </div>
  );
};
