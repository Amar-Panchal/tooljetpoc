/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextInput } from "../Components/TextInput";
import KendoInput from "./Components/KendoInput";
import KendoButton from "./Components/KendoButton";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DateInput } from "@progress/kendo-react-all";
import useRegistrationPage from "./hooks/useRegistrationPage";

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
        return (
          <KendoInput
            props={component}
            value={RegistrationPageFormData[component.name]}
            onChange={(e) =>
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.target.value,
              })
            }
          />
        );
      case "Button":
        return (
          <KendoButton
            onclick={() => {
              alert(JSON.stringify(RegistrationPageFormData));
            }}
            props={component}
          />
        );
    }
  }

  return (
    <div style={{ padding: "100px" }}>
      <div>
        <h1>Registration Form </h1>
      </div>
      {componentsToRender?.map((component) => {
        return renderComponent(component);
      })}

      <button onClick={() => setRegistrationPageFormData({})}>clear</button>
    </div>
  );
}

export { RegistrationPage };
