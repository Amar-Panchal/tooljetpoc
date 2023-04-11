/** @format */

import React, { useState } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
function KendoNumberInput({ component, onChange, value }) {
  const { definition, name } = component;
  const properties = {
    id: name,
    defaultValue: definition.properties.value.value,
    placeholder: definition.properties.placeholder.value,
    minValue: definition.properties.minValue.value,
    maxValue: definition.properties.maxValue.value,
    // tooltip: definition.general.tooltip.value,
  };

  const styles = {
    color: definition.styles.textColor.value,
    backgroundColor: definition.styles.backgroundColor.value,
    border: `1px solid  ${component.definition.styles.borderColor.value}`,
    borderRadius: parseInt(
      definition.styles.borderRadius.value.replace(/[^\d]/g, "")
    ),
    boxShadow: definition.generalStyles.boxShadow.value,
    // width:  definition.styles.                    .value,
    // height:  definition.styles.                    .value,
    // position:  definition.styles.                    .value,
  };

  return (
    <NumericTextBox
      style={styles}
      defaultValue={properties.defaultValue}
      id={properties.id}
      placeholder={properties.placeholder}
      minValue={properties.minValue}
      maxValue={properties.maxValue}
      onChange={onChange}
      value={value}
    />
  );
}

export default KendoNumberInput;
