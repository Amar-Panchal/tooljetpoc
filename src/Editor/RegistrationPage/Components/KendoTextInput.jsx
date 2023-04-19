/** @format */

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Hint } from "@progress/kendo-react-all";

const KendoTextInput = ({ component, onChange, value }) => {
  const { definition, name } = component;
  const [lengthCounter, setLengthCounter] = React.useState(
    definition.properties.value.value
  );

  const properties = {
    id: name,
    defaultValue: definition.properties.value.value,
    placeholder: definition.properties.placeholder.value,
    regex: definition.validation.regex.value,
    minLength: definition.validation.minLength.value,
    maxLength: definition.validation.maxLength.value,
    // tooltip: definition.general.tooltip.value,
  };

  const styles = {
    color: definition.styles.textColor.value,
    backgroundColor: definition.styles.backgroundColor.value,
    border: `1px solid  ${component.definition.styles.borderColor.value}`,
    errorTextColor: definition.styles.errTextColor.value,
    borderRadius: parseInt(
      definition.styles.borderRadius.value.replace(/[^\d]/g, "")
    ),
    boxShadow: definition.generalStyles.boxShadow.value,
    width: "300px",
    height: "100%",
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
      }}
    >
      <p>{titleCaseStr}</p>
      <Input
        style={styles}
        id={properties.id}
        defaultValue={properties.defaultValue}
        placeholder={properties.placeholder}
        minLength={properties.minLength}
        maxLength={properties.maxLength}
        onChange={(e) => {
          setLengthCounter(e.value);
          onChange(e);
        }}
        value={value}
      />

      <Hint direction={"end"}>
        {lengthCounter.length < definition.validation.minLength.value &&
          `Min ${lengthCounter.length} / ${definition.validation.minLength.value} 	`}
        &nbsp; &nbsp; &nbsp; &nbsp;
        {lengthCounter.length < definition.validation.maxLength.value &&
          ` Max ${lengthCounter.length} / ${definition.validation.maxLength.value}`}
      </Hint>
    </div>
  );
};

export default KendoTextInput;
