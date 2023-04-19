/** @format */

import React, { useState } from "react";
import { Checkbox } from "@progress/kendo-react-inputs";

function KendoCheckBox({ component, onChange, value }) {
  const styles = component.definition.styles;
  const computedStyles = {
    color: styles.textColor.value,
    gap: "10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={computedStyles}>
      <Checkbox
        style={{
          backgroundColor: styles.checkboxColor.value,
        }}
        name={component.definition.properties.label.value}
        label={component.definition.properties.label.value}
        onChange={onChange}
        id={component.name}
        value={value?.isCheck}
      />
    </div>
  );
}

export default KendoCheckBox;
