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
import { toast } from "react-hot-toast";

function RegistrationPage() {
  const {
    componentsToRender,
    RegistrationPageFormData,
    setRegistrationPageFormData,
  } = useRegistrationPage();

  function saveRegistrationPageFormData() {
    // alert(JSON.stringify(RegistrationPageFormData));

    localStorage.setItem(
      "savedRegistrationPageFormData",
      JSON.stringify(RegistrationPageFormData)
    );

    toast.success("Saved Successfully");
  }

  function retriveRegistrationPageFormData() {
    const temp = localStorage.getItem("savedRegistrationPageFormData");

    setRegistrationPageFormData(JSON.parse(temp));
    toast.success("Retrieved Successfully");
  }
  console.log("object", RegistrationPageFormData);

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
            value={RegistrationPageFormData[component.name]}
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
            value={RegistrationPageFormData[component.name]}
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
            value={RegistrationPageFormData[component.name]}
          />
        );
      case "Text":
        return <KendoText component={component} />;
      case "Button":
        return (
          <KendoButton
            component={component}
            onClick={saveRegistrationPageFormData}
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

                  [component.name]: {
                    isCheck: e.target.value,
                    name: e.target.name,
                  },
                });
              } else {
                setRegistrationPageFormData({
                  ...RegistrationPageFormData,

                  [component.name]: "",
                });
              }
            }}
            value={RegistrationPageFormData[component.name]}
          />
        );
    }
  }

  return (
    <div>
      <div>
        <button onClick={retriveRegistrationPageFormData}>
          get registration
        </button>
      </div>
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
    </div>
  );
}

export { RegistrationPage };
