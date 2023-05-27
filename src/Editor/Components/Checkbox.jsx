/** @format */

import React, { useEffect } from "react";
import { Checkbox as KendoCheckBoc } from "@progress/kendo-react-inputs";

export const Checkbox = function Checkbox({
  height,
  properties,
  styles,
  fireEvent,
  setExposedVariable,
  registerAction,
  darkMode,
  dataCy,
  PatientRegistrationFormData,
  setPatientRegistrationFormData,
  component,
}) {
  const defaultValueFromProperties = properties.defaultValue ?? false;
  const [defaultValue, setDefaultvalue] = React.useState(
    defaultValueFromProperties
  );
  const [checked, setChecked] = React.useState(
    PatientRegistrationFormData[component.name].length > 0 ? true : false
  );
  const { label } = properties;
  const { visibility, disabledState, checkboxColor } = styles;
  const textColor =
    darkMode && styles.textColor === "#000" ? "#fff" : styles.textColor;

  useEffect(() => {
    setChecked(
      PatientRegistrationFormData[component.name].length > 0 ? true : false
    );
  }, [PatientRegistrationFormData]);
  function toggleValue(e) {
    const isChecked = e.target.checked;

    setChecked(isChecked);
    setExposedVariable("value", isChecked);
    if (isChecked) {
      setPatientRegistrationFormData({
        ...PatientRegistrationFormData,
        [component.name]: label,
      });

      fireEvent("onCheck");
    } else {
      setPatientRegistrationFormData({
        ...PatientRegistrationFormData,
        [component.name]: "",
      });
      fireEvent("onUnCheck");
    }
  }
  useEffect(() => {
    setExposedVariable("value", defaultValueFromProperties);
    setDefaultvalue(defaultValueFromProperties);
    setChecked(defaultValueFromProperties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValueFromProperties]);

  registerAction(
    "setChecked",
    async function (status) {
      setExposedVariable("value", status).then(() =>
        status ? fireEvent("onCheck") : fireEvent("onUnCheck")
      );
      setChecked(status);
    },
    [setChecked]
  );

  return (
    <div
      data-disabled={disabledState}
      style={{
        height,
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
      data-cy={dataCy}
    >
      <KendoCheckBoc
        onClick={(e) => {
          toggleValue(e);
        }}
        defaultChecked={defaultValue}
        checked={checked}
        style={{
          backgroundColor: checked ? `${checkboxColor}` : "white",
        }}
      />
      {label}
    </div>
  );
};
