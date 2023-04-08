/** @format */

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";

const KendoTextInput = ({ component, value, onChange }) => {
  const { backgroundColor, borderColor, borderRadius, textColor } =
    component.definition.styles;
  const { generalStyles, properties } = component.definition;
  console.log("valueeee in inputt chin", value);
  return (
    <div style={{ margin: "10px" }}>
      <p>
        {component.name
          .replace(/([A-Z])/g, " $1")
          .charAt(0)
          .toUpperCase() + component.name.replace(/([A-Z])/g, " $1").slice(1)}
      </p>
      <Input
        id={component.name}
        style={{
          backgroundColor: backgroundColor.value,
          borderColor: borderColor.value,
          borderRadius: parseInt(borderRadius.value.slice(2, -2)),
          color: textColor.value,
          boxShadow: generalStyles.boxShadow.value,
          width: `${(component.layouts.desktop.width * 1292) / 43}px`,
          height: `${component.layouts.desktop.height}px`,
        }}
        placeholder={properties.placeholder.value}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default KendoTextInput;
