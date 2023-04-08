/** @format */

import { DropDownList } from "@progress/kendo-react-all";
import React from "react";

function KendoDropDown() {
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const [value, setValue] = React.useState("X-Small");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <DropDownList
      data={sizes}
      value={value}
      onChange={handleChange}
      style={{
        width: "300px",
      }}
    />
  );
}

export default KendoDropDown;
