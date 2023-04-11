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
    <div style={{ display: "flex" }}>
      <span className="form-check-label col-auto py-0" style={{ color: "red" }}>
        {component.definition.properties.label.value}
      </span>
      {radioButtons.map((val) => {
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
