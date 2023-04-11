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
    if (componentType === "text") console.log("componet type", componentType);
    switch (componentType) {
      case "TextInput":
        return (
          <KendoTextInput
            component={component}
            value={RegistrationPageFormData[component.name]}
            onChange={(e) =>
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.target.value,
              })
            }
          />
        );
      case "NumberInput":
        return (
          <KendoNumberInput
            component={component}
            onChange={(e) =>
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.target.value,
              })
            }
          />
        );
      case "Datepicker":
        return (
          <KendoDatePicker
            component={component}
            onChange={(e) =>
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.target.value,
              })
            }
          />
        );
      case "DropDown":
        return (
          <KendoDropDown
            component={component}
            onChange={(e) =>
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.target.value,
              })
            }
          />
        );
      case "Text":
        return <KendoText component={component} />;
      case "Button":
        return (
          <KendoButton
            component={component}
            onClick={() => alert(JSON.stringify(RegistrationPageFormData))}
          />
        );
      case "RadioButton":
        return (
          <KendoRadioButton
            component={component}
            onChange={(e) => {
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.value,
              });
            }}
            value={RegistrationPageFormData[component.name]}
          />
        );
      case "Checkbox":
        return (
          <KendoCheckBox
            component={component}
            onChange={(e) => {
              if (e.value) {
                setRegistrationPageFormData({
                  ...RegistrationPageFormData,

                  [component.name]: e.target.name,
                });
              } else {
                setRegistrationPageFormData({
                  ...RegistrationPageFormData,

                  [component.name]: "",
                });
              }
            }}
          />
        );
    }
  }
  console.log("regist", RegistrationPageFormData);
  return (
    <div
      style={{
        padding: "100px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {componentsToRender?.map((component) => {
        return renderComponent(component);
      })}
    </div>
  );
}

export { RegistrationPage };
