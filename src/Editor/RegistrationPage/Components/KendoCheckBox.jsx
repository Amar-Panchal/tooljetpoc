/** @format */

import React, { useState } from "react";
import { Checkbox } from "@progress/kendo-react-inputs";

function KendoCheckBox({ component, onChange }) {
  const styles = component.definition.styles;
  const computedStyles = {
    color: styles.textColor.value,
  };

  return (
    <div style={computedStyles}>
      <Checkbox
        style={{ backgroundColor: styles.checkboxColor.value }}
        name={component.definition.properties.label.value}
        label={component.definition.properties.label.value}
        onChange={onChange}
        id={component.name}
      />
    </div>
  );
}

export default KendoCheckBox;
