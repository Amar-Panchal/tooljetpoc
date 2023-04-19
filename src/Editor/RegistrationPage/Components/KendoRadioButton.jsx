/** @format */
import React, { useEffect, useState } from "react";
import { RadioButton } from "@progress/kendo-react-inputs";
import { curry } from "lodash";

function KendoRadioButton({ component, onChange, value }) {
  const [radioButtons, setRadios] = useState(
    JSON.parse(
      component.definition.properties.display_values.value.replace(/{{|}}/g, "")
    )
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>{component.definition.properties.label.value}</div>
      {radioButtons.map((val) => {
        console.log("value radioButtons radio", value === val);
        return (
          <div
            style={{
              color: component.definition.styles.textColor.value,
            }}
          >
            <RadioButton
              id={component.name}
              value={val}
              checked={value === val}
              label={val}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
}

export default KendoRadioButton;
