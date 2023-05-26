/** @format */

import React, { useEffect, useState } from "react";
import DatePickerComponent from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export const Datepicker = function Datepicker({
  height,
  properties,
  styles,
  exposedVariables,
  setExposedVariable,
  validate,
  onComponentClick,
  component,
  id,
  darkMode,
  fireEvent,
  dataCy,
  setPatientRegistrationFormData,
  PatientRegistrationFormData,
}) {
  const { enableTime, enableDate, defaultValue, disabledDates } = properties;
  const format = typeof properties.format === "string" ? properties.format : "";
  const { visibility, disabledState, borderRadius } = styles;

  const [date, setDate] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);

  const selectedDateFormat = enableTime ? `${format} LT` : format;

  const computeDateString = (date) => {
    console.log("datee in ci", date);
    if (date && enableDate) {
      return moment(date).format(selectedDateFormat);
    } else if (date && !enableDate && enableTime) {
      return moment(date).format("LT");
    } else return "Select Date";
  };
  function calculateAge(date) {
    const today = new Date();
    const birthDate = new Date(date);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonthDate.getDate();
      ageMonths--;
    }

    if (ageYears < 1) {
      ageYears = 0;
    }

    return {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    };
  }

  const onDateChange = (date) => {
    const tem = calculateAge(date);
    console.log(tem);

    setPatientRegistrationFormData({
      ...PatientRegistrationFormData,
      [component.name]: date,
      age: tem.years > 0 ? tem.years : PatientRegistrationFormData.age,
    });
    setDate(date);
    const dateString = computeDateString(date);
    setExposedVariable("value", dateString).then(() => {
      fireEvent("onSelect");
    });
  };

  useEffect(() => {
    const dateMomentInstance =
      defaultValue && moment(defaultValue, selectedDateFormat);
    if (dateMomentInstance && dateMomentInstance.isValid()) {
      setDate(dateMomentInstance.toDate());
      setExposedVariable("value", defaultValue);
    } else {
      setDate(null);
      setExposedVariable("value", undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (Array.isArray(disabledDates) && disabledDates.length > 0) {
      const _exluded = [];
      disabledDates?.map((item) => {
        if (moment(item, format).isValid()) {
          _exluded.push(moment(item, format).toDate());
        }
      });
      setExcludedDates(_exluded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledDates, format]);

  const validationData = validate(exposedVariables.value);
  const { isValid, validationError } = validationData;

  useEffect(() => {
    setExposedVariable("isValid", isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);
  console.log(
    "PatientRegistrationFormData[component.name]",
    PatientRegistrationFormData[component.name],
    computeDateString(PatientRegistrationFormData[component.name])
  );
  return (
    <div
      data-disabled={disabledState}
      className={`datepicker-widget ${darkMode && "theme-dark"}`}
      data-cy={dataCy}
      style={{
        height,
        display: visibility ? "" : "none",
      }}
    >
      <DatePickerComponent
        className={`input-field form-control ${
          !isValid ? "is-invalid" : ""
        } validation-without-icon px-2 ${
          darkMode ? "bg-dark color-white" : "bg-light"
        }`}
        selected={date}
        value={computeDateString(PatientRegistrationFormData[component.name])}
        onChange={(date) => onDateChange(date)}
        showTimeInput={enableTime ? true : false}
        showTimeSelectOnly={enableDate ? false : true}
        onFocus={(event) => {
          onComponentClick(id, component, event);
        }}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        excludeDates={excludedDates}
        customInput={
          <input style={{ borderRadius: `${borderRadius}px`, height }} />
        }
      />

      {/* <DatePicker
        className={`input-field form-control ${
          !isValid ? "is-invalid" : ""
        } validation-without-icon px-2 ${
          darkMode ? "bg-dark color-white" : "bg-light"
        }`}
        selected={date}
        value={date !== null ? computeDateString(date) : "Select Date"}
        onChange={(date) => onDateChange(date)}
        showTimeInput={enableTime ? true : false}
        showTimeSelectOnly={enableDate ? false : true}
        onFocus={(event) => {
          onComponentClick(id, component, event);
        }}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        excludeDates={excludedDates}
        customInput={
          <input style={{ borderRadius: `${borderRadius}px`, height }} />
        }
      /> */}

      <div
        data-cy="date-picker-invalid-feedback"
        className={`invalid-feedback ${isValid ? "" : "d-flex"}`}
      >
        {validationError}
      </div>
    </div>
  );
};
