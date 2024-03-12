/** @format */

import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";

export const DemographicField = function DemographicField({
  height,
  properties,
  styles,
  darkMode,
  registerAction,
  setExposedVariable,
  dataCy,
  reportTemplateDataMap,
  component,
  containerProps,
  patientData,
}) {
  let {
    textSize,
    textColor,
    textAlign,
    backgroundColor,
    fontWeight,
    decoration,
    transformation,
    fontStyle,
    lineHeight,
    textIndent,
    letterSpacing,
    wordSpacing,
    fontVariant,
    disabledState,
  } = styles;
  const { loadingState } = properties;
  const [text, setText] = useState(() => computeText());
  const [visibility, setVisibility] = useState(styles.visibility);
  const color = ["#000", "#000000"].includes(textColor)
    ? darkMode
      ? "#fff"
      : "#000"
    : textColor;
  console.log(
    "containerProps",
    containerProps.appDefinition.globalSettings.globalFontVariant
  );
  useEffect(() => {
    if (visibility !== styles.visibility) setVisibility(styles.visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styles.visibility]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const text = computeText();
    setText(text);
    setExposedVariable("text", text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.text]);

  registerAction(
    "setText",
    async function (text) {
      setText(text);
      setExposedVariable("text", text);
    },
    [setText]
  );
  registerAction(
    "visibility",
    async function (value) {
      setVisibility(value);
    },
    [setVisibility]
  );

  function computeText() {
    return properties.text === 0 || properties.text === false
      ? properties.text?.toString()
      : properties.text;
  }

  const computedStyles = {
    backgroundColor,
    color,
    height,
    display: visibility ? "flex" : "none",
    alignItems: "center",
    textAlign,
    fontWeight: fontWeight ? fontWeight : fontWeight === "0" ? 0 : "normal",
    lineHeight: lineHeight ?? 1.5,
    textDecoration: decoration ?? "none",
    textTransform: transformation ?? "none",
    fontStyle: fontStyle ?? "none",
    fontVariant: "Monospace",
    textIndent: `${textIndent}px` ?? "0px",
    letterSpacing: `${letterSpacing}px` ?? "0px",
    wordSpacing: `${wordSpacing}px` ?? "0px",
    minWidth: "200px",
    fontFamily: containerProps.appDefinition.globalSettings.globalFontVariant,
  };

  function sanitizeString(str) {
    // Remove whitespace
    str = str.replace(/\s+/g, "");

    // Convert all characters to lowercase
    str = str.toLowerCase();

    // Remove special characters
    str = str.replace(/[^\w\s]/gi, "");

    return str;
  }
  let temp = patientData;
  console.log("component1111dfssadfdf", patientData.testName);

  return (
    <div
      data-disabled={disabledState}
      className="text-widget"
      style={computedStyles}
      data-cy={dataCy}
    >
      {!loadingState &&
        (component.name === "testName" ? (
          <div
            style={{ width: "100%", fontSize: textSize }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                `
           
          
                 
                   ${patientData.testName ? patientData[0].testName : text}`
              ),
            }}
          />
        ) : (
          <div
            style={{ width: "100%", fontSize: textSize }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                `
           
          
          ${text}  
          
          ${
            patientData && component && patientData[component?.name]
              ? component?.name === "gender"
                ? patientData[component?.name].name
                : component?.name === "age"
                ? patientData[component?.name].value
                : patientData[component?.name]
              : ""
          }
          
              `
              ),
            }}
          />
        ))}

      {loadingState === true && (
        <div style={{ width: "100%" }}>
          <center>
            <div className="spinner-border" role="status"></div>
          </center>
        </div>
      )}
    </div>
  );
};
