/** @format */
import React from "react";
import { RadioButton } from "@progress/kendo-react-inputs";

function KendoRadioButton() {
  return (
    <RadioButton name="group1" value="first" checked={false} label="First" />
  );
}

export default KendoRadioButton;
