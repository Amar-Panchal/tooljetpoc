/** @format */

import {
  FieldWrapper,
  NumericTextBox as KendoNumericTextBox,
} from "@progress/kendo-react-all";
import React, { useEffect } from "react";

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
  const { visibility, borderRadius, borderColor, backgroundColor } = styles;

  const textColor =
    darkMode && ["#232e3c", "#000000ff"].includes(styles.textColor)
      ? "#fff"
      : styles.textColor;

  const handleChange = (e) => {
    setPatientRegistrationFormData({
      ...PatientRegistrationFormData,
      [component.name]: e.value,
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

  return (
    <FieldWrapper>
      <KendoNumericTextBox
        disabled={styles.disabledState}
        onChange={handleChange}
        type="number"
        // className='form-control'
        placeholder={properties.placeholder}
        style={computedStyles}
        value={PatientRegistrationFormData[component.name]}
        data-cy={dataCy}
      />
    </FieldWrapper>
  );
};
