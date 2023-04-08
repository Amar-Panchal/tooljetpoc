/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextInput } from "../Components/TextInput";
import KendoTextInput from "./Components/KendoTextInput";
import KendoButton from "./Components/KendoButton";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DateInput } from "@progress/kendo-react-all";
import useRegistrationPage from "./hooks/useRegistrationPage";
import KendoNumberInput from "./Components/KendoNumberInput";
import KendoDatePicker from "./Components/KendoDatePicker";
import KendoDropDown from "./Components/KendoDropDown";
import KendoText from "./Components/KendoText";
import KendoRadioButton from "./Components/KendoRadioButton";
import KendoCheckBox from "./Components/KendoCheckBox";

function RegistrationPage() {
  const {
    componentsToRender,
    RegistrationPageFormData,
    setRegistrationPageFormData,
  } = useRegistrationPage();

  function renderComponent(component) {
    let componentType = component.component;

    switch (componentType) {
      case "TextInput":
        return <KendoTextInput component={component} />;
      case "NumberInput":
        return <KendoNumberInput />;
      case "Datepicker":
        return <KendoDatePicker />;
      case "DropDown":
        return <KendoDropDown />;
      case "Text":
        return <KendoText />;
      case "Button":
        return <KendoButton />;
      case "RadioButton":
        return <KendoRadioButton />;
      case "Checkbox":
        return <KendoCheckBox />;
    }
  }

  return (
    <div style={{ padding: "100px" }}>
      {componentsToRender?.map((component) => {
        return renderComponent(component);
      })}
    </div>
  );
}

export { RegistrationPage };
