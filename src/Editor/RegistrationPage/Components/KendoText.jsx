/** @format */

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

function KendoText({ component }) {
  let styles = component.definition.styles;

  const [text, setText] = useState("");
  // tooltip: definition.general.tooltip.value,
  const color = ["#000", "#000000"].includes(styles.textColor)
    ? darkMode
      ? "#fff"
      : "#000"
    : styles.textColor;

  const computedStyles = {
    backgroundColor: styles.backgroundColor.value,
    color: color.value,
    textAlign: styles.textAlign.value,
    fontWeight: styles.fontWeight
      ? styles.fontWeight.value
      : styles.fontWeight === "0"
      ? 0
      : "normal",
    lineHeight:
      typeof styles.lineHeight.value === "number"
        ? typeof styles.lineHeight.value
        : styles.lineHeight.value.replace(/[^\d]/g, "") / 10,
    textDecoration: styles.decoration.value ?? "none",
    textTransform: styles.transformation.value ?? "none",
    fontStyle: styles.fontStyle.value ?? "none",
    fontVariant: styles.fontVariant.value ?? "normal",
    textIndent:
      typeof styles.textIndent.value === "number"
        ? styles.textIndent.value
        : `${parseInt(styles.textIndent.value.replace(/[^\d]/g, ""))}px` ??
          "0px",
    letterSpacing:
      typeof styles.letterSpacing.value === "number"
        ? styles.letterSpacing.value
        : `${parseInt(styles.letterSpacing.value.replace(/[^\d]/g, ""))}px` ??
          "0px",
    wordSpacing:
      typeof styles.wordSpacing.value === "number"
        ? styles.wordSpacing.value
        : `${parseInt(styles.wordSpacing.value.replace(/[^\d]/g, ""))}px` ??
          "0px",
  };

  useEffect(() => {
    setText(component.definition.properties.text.value);
  }, component);
  console.log("computed styles in kend toes", typeof styles.textSize.value);
  return (
    <div style={computedStyles}>
      <div
        id={component.name}
        style={{
          width: "100%",
          fontSize:
            typeof styles.textSize.value === "number"
              ? styles.textSize.value
              : parseInt(styles.textSize.value.replace(/[^\d]/g, "")),
        }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
      />
    </div>
  );
}

export default KendoText;
