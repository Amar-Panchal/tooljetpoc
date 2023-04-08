/** @format */

import React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";

function KendoDatePicker() {
  return <DatePicker defaultValue={new Date()} format="dd/MM/yyyy" />;
}

export default KendoDatePicker;
