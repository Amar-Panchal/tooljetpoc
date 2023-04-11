/** @format */

import React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";

function KendoDatePicker({ component, onChange }) {
  const value = component.definition.properties.defaultValue.value;
  const parts = value.split("/");
  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`;

  return (
    <DatePicker
      defaultValue={new Date(isoDate)}
      format="dd/MM/yyyy"
      onChange={onChange}
    />
  );
}

export default KendoDatePicker;
