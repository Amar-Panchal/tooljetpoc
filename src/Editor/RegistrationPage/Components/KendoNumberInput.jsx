/** @format */

import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
function KendoNumberInput() {
  return (
    <NumericTextBox
      label={"kendo number input"}
      width={300}
      placeholder="please enter value"
      value="22"
    />
  );
}

export default KendoNumberInput;
