/** @format */

import React from "react";
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
    // border: `1px solid  ${component.definition.styles.borderColor.value}`,
    borderRadius: parseInt(
      definition.styles.borderRadius.value.replace(/[^\d]/g, "")
    ),
    boxShadow: definition.generalStyles.boxShadow.value,
    width: "100%",
    height: "100%",

    // width:  definition.styles.                    .value,
    // height:  definition.styles.                    .value,
    // position:  definition.styles.                    .value,
  };

  function camelCaseToTitleCase(str) {
    // Split the string by upper case characters
    const words = str.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them together
    const titleCaseStr = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCaseStr;
  }

  const titleCaseStr = camelCaseToTitleCase(name);
  console.log(titleCaseStr); // Outputs: "This Is Camel Case

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "10px",
        width: "100%",
      }}
    >
      <p> {titleCaseStr}</p>

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
    </div>
  );
}

export default KendoNumberInput;
