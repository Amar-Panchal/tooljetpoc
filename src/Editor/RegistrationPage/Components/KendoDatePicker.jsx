/** @format */

import React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";

function KendoDatePicker({ component, onChange, value }) {
  const defaultvalue = component.definition.properties.defaultValue.value;
  const parts = defaultvalue.split("/");
  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`;

  function camelCaseToTitleCase(str) {
    // Split the string by upper case characters
    const words = str.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them together
    const titleCaseStr = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCaseStr;
  }

  const titleCaseStr = camelCaseToTitleCase(component.name);
  console.log(titleCaseStr); // Outputs: "This Is Camel Case

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
      <p>{titleCaseStr}</p>
      <DatePicker
        defaultValue={new Date(isoDate)}
        format="dd/MM/yyyy"
        onChange={onChange}
        value={value ? new Date(value) : null}
        width={"300px"}
      />
    </div>
  );
}

export default KendoDatePicker;
