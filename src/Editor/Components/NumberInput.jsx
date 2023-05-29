/** @format */

import {
  DropDownList,
  NumericTextBox as KendoNumericTextBox,
} from "@progress/kendo-react-all";
import React from "react";

export const NumberInput = function NumberInput({
  height,
  properties,
  styles,
  darkMode,
  fireEvent,
  dataCy,
  setPatientRegistrationFormData,
  PatientRegistrationFormData,
  component,
}) {
  const defaultAgeType = ["Year", "Month", "Day"];
  const { visibility, borderRadius, borderColor, backgroundColor } = styles;
  const [ageType, setAgeType] = React.useState("Year");
  const handleChangeAgeType = (event) => {
    setAgeType(event.target.value);
  };
  const textColor =
    darkMode && ["#232e3c", "#000000ff"].includes(styles.textColor)
      ? "#fff"
      : styles.textColor;

  const handleChange = (e) => {
    setPatientRegistrationFormData({
      ...PatientRegistrationFormData,

      [component.name]: {
        value: e.value,
        ageType: ageType,
      },
    });

    fireEvent("onChange");
  };

  const computedStyles = {
    height,
    display: visibility ? "" : "none",
    borderRadius: `${borderRadius}px`,
    borderColor,
    color: textColor,
    backgroundColor:
      darkMode && ["#ffffff", "#ffffffff"].includes(backgroundColor)
        ? "#000000"
        : backgroundColor,
  };

  if (component.name.includes("numberinput")) console.log("number input");
  if (component.name.includes("age")) console.log("age input");

  return (
    <div
      style={{
        ...computedStyles,
        display: "flex",
        gap: "5px",
      }}
    >
      <KendoNumericTextBox
        disabled={styles.disabledState}
        onChange={handleChange}
        placeholder={properties.placeholder}
        style={computedStyles}
        value={PatientRegistrationFormData[component.name]?.value}
        data-cy={dataCy}
      />

      {component.name.includes("age") && (
        <div
          style={{
            ...computedStyles,

            minWidth: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropDownList
            data={defaultAgeType}
            value={ageType}
            onChange={handleChangeAgeType}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};
