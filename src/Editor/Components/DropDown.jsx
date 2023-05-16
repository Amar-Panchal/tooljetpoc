/** @format */

import _ from "lodash";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export const DropDown = function DropDown({
  height,
  validate,
  properties,
  styles,
  setExposedVariable,
  fireEvent,
  darkMode,
  onComponentClick,
  id,
  component,
  exposedVariables,
  registerAction,
  dataCy,
  setPatientRegistrationFormData,
  PatientRegistrationFormData,
}) {
  const GetProcessingLocation =
    "https://elabnextapi-dev.azurewebsites.net/api/ProcessingLocation/GetProcessingLocation";
  const GetFranchise =
    "https://elabnextapi-dev.azurewebsites.net/api/Franchise/GetFranchise";
  const GetClient =
    "https://elabnextapi-dev.azurewebsites.net/api/Client/GetClient";
  const GetDoctor =
    "https://elabnextapi-dev.azurewebsites.net/api/Doctor/GetDoctor";
  const GetCollectionPoint =
    "https://elabnextapi-dev.azurewebsites.net/api/CollectionPoint/GetCollectionPoint";

  let { label, value, display_values, values } = properties;

  const [remoteData, setRemoteData] = useState([]);
  const {
    selectedTextColor,
    borderRadius,
    visibility,
    disabledState,
    justifyContent,
  } = styles;
  const [currentValue, setCurrentValue] = useState(() => value);
  const { value: exposedValue } = exposedVariables;

  if (!_.isArray(values)) {
    values = [];
  }

  let selectOptions = [];

  try {
    selectOptions = [
      ...values.map((value, index) => {
        return { label: display_values[index], value: value };
      }),
    ];
  } catch (err) {
    console.log(err);
  }

  function selectOption(value) {
    if (values.includes(value)) {
      setCurrentValue(value);
      setExposedVariable("value", value).then(fireEvent("onSelect"));
    } else {
      setCurrentValue(undefined);
      setExposedVariable("value", undefined).then(fireEvent("onSelect"));
    }
  }

  registerAction(
    "selectOption",
    async function (value) {
      selectOption(value);
    },
    [JSON.stringify(values), setCurrentValue]
  );

  const validationData = validate(value);
  const { isValid, validationError } = validationData;

  useEffect(() => {
    setExposedVariable("isValid", isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  useEffect(() => {
    let newValue = undefined;
    if (values?.includes(value)) {
      newValue = value;
    }
    setExposedVariable("value", newValue);
    setCurrentValue(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (exposedValue !== currentValue)
      setExposedVariable("value", currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    let newValue = undefined;
    if (values?.includes(currentValue)) newValue = currentValue;
    else if (values?.includes(value)) newValue = value;

    setCurrentValue(newValue);
    setExposedVariable("value", newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values)]);

  useEffect(() => {
    setExposedVariable("label", label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  const onSearchTextChange = (searchText, actionProps) => {
    if (actionProps.action === "input-change") {
      setExposedVariable("searchText", searchText);
      fireEvent("onSearchTextChanged");
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: darkMode ? "rgb(31,40,55)" : "white",
      minHeight: height,
      height: height,
      boxShadow: state.isFocused ? null : null,
      borderRadius: Number.parseFloat(borderRadius),
    }),

    valueContainer: (provided, _state) => ({
      ...provided,
      height: height,
      padding: "0 6px",
      justifyContent,
    }),

    singleValue: (provided, _state) => ({
      ...provided,
      color: disabledState
        ? "grey"
        : selectedTextColor
        ? selectedTextColor
        : darkMode
        ? "white"
        : "black",
    }),

    input: (provided, _state) => ({
      ...provided,
      color: darkMode ? "white" : "black",
    }),
    indicatorSeparator: (_state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, _state) => ({
      ...provided,
      height: height,
    }),
    option: (provided, state) => {
      const styles = darkMode
        ? {
            color: "white",
            backgroundColor:
              state.value === currentValue ? "#3650AF" : "rgb(31,40,55)",
            ":hover": {
              backgroundColor:
                state.value === currentValue ? "#1F2E64" : "#323C4B",
            },
            maxWidth: "auto",
            minWidth: "max-content",
          }
        : {
            backgroundColor: state.value === currentValue ? "#7A95FB" : "white",
            color: state.value === currentValue ? "white" : "black",
            ":hover": {
              backgroundColor:
                state.value === currentValue ? "#3650AF" : "#d8dce9",
            },
            maxWidth: "auto",
            minWidth: "max-content",
          };
      return {
        ...provided,
        justifyContent,
        height: "auto",
        display: "flex",
        flexDirection: "rows",
        alignItems: "center",
        ...styles,
      };
    },
    menu: (provided, _state) => ({
      ...provided,
      backgroundColor: darkMode ? "rgb(31,40,55)" : "white",
    }),
  };

  // useEffect(() => {
  //   axios
  //     .all([
  //       axios.get(GetProcessingLocation),
  //       axios.get(GetFranchise),
  //       axios.get(GetDoctor),
  //       axios.get(GetCollectionPoint),
  //       axios.get(GetClient),
  //     ])
  //     .then(
  //       axios.spread(
  //         (response1, response2, response3, response4, response5) => {
  //           if (component.name === "processingLocation") {
  //             let temp = [];
  //             response1.data.resultData.processingLocationList.map(
  //               (procLoc) => {
  //                 temp.push({
  //                   label: procLoc.processingLocationName,
  //                   value: procLoc.processingLocationId,
  //                 });
  //               }
  //             );

  //             setRemoteData(temp);
  //           } else if (component.name === "collectionCenter") {
  //             let temp = [];
  //             response4.data.resultData.collectionPointList.map((procLoc) => {
  //               temp.push({
  //                 label: procLoc.collectionPointName,
  //                 value: procLoc.collectionPointId,
  //               });
  //             });

  //             setRemoteData(temp);
  //           } else if (component.name === "franchise") {
  //             let temp = [];
  //             response2.data.resultData.franchiseList.map((procLoc) => {
  //               temp.push({
  //                 label: procLoc.franchiseName,
  //                 value: procLoc.franchiseId,
  //               });
  //             });

  //             setRemoteData(temp);
  //           } else if (component.name === "doctor") {
  //             let temp = [];
  //             response3.data.resultData.doctorList.map((procLoc) => {
  //               temp.push({
  //                 label:
  //                   procLoc.title +
  //                   " " +
  //                   procLoc.firstName +
  //                   " " +
  //                   procLoc.lastName,
  //                 value: procLoc.doctorId,
  //               });
  //             });

  //             setRemoteData(temp);
  //           } else if (component.name === "client") {
  //             console.log("GetClient", response5.data.resultData.clientList);
  //             let temp = [];
  //             response5.data.resultData.clientList.map((procLoc) => {
  //               temp.push({
  //                 label: procLoc.clientName,
  //                 value: procLoc.clientId,
  //               });
  //             });

  //             setRemoteData(temp);
  //           }
  //         }
  //       )
  //     )
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  useEffect(() => {
    const apiCalls = [
      {
        url: GetProcessingLocation,
        name: "processingLocation",
        mapFn: (procLoc) => ({
          label: procLoc.processingLocationName,
          value: procLoc.processingLocationId,
        }),
      },
      {
        url: GetFranchise,
        name: "franchise",
        mapFn: (procLoc) => ({
          label: procLoc.franchiseName,
          value: procLoc.franchiseId,
        }),
      },
      {
        url: GetDoctor,
        name: "doctor",
        mapFn: (procLoc) => ({
          label: `${procLoc.title} ${procLoc.firstName} ${procLoc.lastName}`,
          value: procLoc.doctorId,
        }),
      },
      {
        url: GetCollectionPoint,
        name: "collectionCenter",
        mapFn: (procLoc) => ({
          label: procLoc.collectionPointName,
          value: procLoc.collectionPointId,
        }),
      },
      {
        url: GetClient,
        name: "client",
        mapFn: (procLoc) => ({
          label: procLoc.clientName,
          value: procLoc.clientId,
        }),
      },
    ];

    axios
      .all(apiCalls.map((call) => axios.get(call.url)))
      .then(
        axios.spread((...responses) => {
          responses.forEach((response, index) => {
            const { data } = response;
            const { name, mapFn } = apiCalls[index];

            const temp = data.resultData[name + "List"].map(mapFn);
            setRemoteData(temp);
          });
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function renderDropdownWithRemoteData() {
    return (
      <div
        className="dropdown-widget row g-0"
        style={{ height, display: visibility ? "" : "none" }}
        onMouseDown={(event) => {
          onComponentClick(id, component, event);
        }}
        data-cy={dataCy}
      >
        <div className="col-auto my-auto">
          <label
            style={{ marginRight: label !== "" ? "1rem" : "0.001rem" }}
            className="form-label py-0 my-0"
          >
            {label}
          </label>
        </div>
        <div className="col px-0 h-100">
          <Select
            isDisabled={disabledState}
            value={
              remoteData.filter(
                (option) =>
                  option.value ===
                  PatientRegistrationFormData[component?.name]?.value
              )[0] ?? { label: "", value: undefined }
            }
            onChange={(selectedOption, actionProps) => {
              if (actionProps.action === "select-option") {
                setPatientRegistrationFormData({
                  ...PatientRegistrationFormData,
                  [component.name]: selectedOption,
                });
                setCurrentValue(selectedOption.value);
                setExposedVariable("value", selectedOption.value).then(() =>
                  fireEvent("onSelect")
                );
              }
            }}
            options={remoteData}
            styles={customStyles}
            isLoading={properties.loadingState}
            onInputChange={onSearchTextChange}
            onFocus={(event) => onComponentClick(event, component, id)}
            // menuPortalTarget={document.body}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {component.name === "collectionCenter" ||
      component.name === "franchise" ||
      component.name === "processingLocation" ||
      component.name === "client" ||
      component.name === "doctor" ? (
        renderDropdownWithRemoteData()
      ) : (
        <div
          className="dropdown-widget row g-0"
          style={{ height, display: visibility ? "" : "none" }}
          onMouseDown={(event) => {
            onComponentClick(id, component, event);
          }}
          data-cy={dataCy}
        >
          <div className="col-auto my-auto">
            <label
              style={{ marginRight: label !== "" ? "1rem" : "0.001rem" }}
              className="form-label py-0 my-0"
            >
              {label}
            </label>
          </div>
          <div className="col px-0 h-100">
            <Select
              isDisabled={disabledState}
              value={
                selectOptions.filter(
                  (option) =>
                    option.value ===
                    PatientRegistrationFormData[component?.name]?.value
                )[0] ?? { label: "", value: undefined }
              }
              onChange={(selectedOption, actionProps) => {
                if (actionProps.action === "select-option") {
                  setPatientRegistrationFormData({
                    ...PatientRegistrationFormData,
                    [component.name]: selectedOption,
                  });
                  setCurrentValue(selectedOption.value);
                  setExposedVariable("value", selectedOption.value).then(() =>
                    fireEvent("onSelect")
                  );
                }
              }}
              options={selectOptions}
              styles={customStyles}
              isLoading={properties.loadingState}
              onInputChange={onSearchTextChange}
              onFocus={(event) => onComponentClick(event, component, id)}
              // menuPortalTarget={document.body}
            />
          </div>
        </div>
      )}

      <div
        className={`invalid-feedback ${
          isValid ? "" : visibility ? "d-flex" : "none"
        }`}
      >
        {validationError}
      </div>
    </>
  );
};
