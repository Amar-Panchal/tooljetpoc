/** @format */

import { DropDownList } from "@progress/kendo-react-all";
import React, { useEffect, useState } from "react";

function KendoDropDown({ component, onChange, value }) {
  // console.log(
  //   "object",
  //   JSON.parse(
  //     component.definition.properties.value.value.replace(/{{|}}/g, "")
  //   )
  // );
  const [dropDownData, setDropDownData] = useState(
    Object.values(
      JSON.parse(
        component.definition.properties.values.value.replace(/{{|}}/g, "")
      ).map((value, index) => ({
        id: index,
        label: JSON.parse(
          component.definition.properties.display_values.value.replace(
            /{{|}}/g,
            ""
          )
        )[index],
        value: value,
      }))
    )
  );

  const handleChange = (event) => {
    console.log("onchange", event);
    onChange(event);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "baseline",
      }}
    >
      <label>{component.definition.properties.label.value}</label>
      <DropDownList
        defaultValue={JSON.parse(
          component.definition.properties.value.value.replace(/{{|}}/g, "")
        )}
        data={dropDownData}
        textField="label"
        dataItemKey="id"
        onChange={handleChange}
        style={{
          width: "300px",
        }}
        value={value}
      />
    </div>
  );
}

export default KendoDropDown;
