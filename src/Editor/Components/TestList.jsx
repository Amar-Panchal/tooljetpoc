/** @format */

import React from "react";
import { SelectTests } from "../RegistrationPage/test";

export const TestList = (props) => {
  const { height, styles } = props;
  const { visibility, backgroundColor, borderRadius, textColor, onHoverColor } =
    styles;

  return (
    <div
      style={{
        display: visibility ? "" : "none",
        height,
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <SelectTests
        setPatientRegistrationFormData={props.setPatientRegistrationFormData}
        PatientRegistrationFormData={props.PatientRegistrationFormData}
        textColor={textColor}
        onHoverColor={onHoverColor}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};
