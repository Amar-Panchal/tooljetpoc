/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextInput } from "../Components/TextInput";
import KendoTextInput from "./Components/KendoTextInput";
import KendoButton from "./Components/KendoButton";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button, DateInput } from "@progress/kendo-react-all";
import useRegistrationPage from "./hooks/useRegistrationPage";
import KendoNumberInput from "./Components/KendoNumberInput";
import KendoDatePicker from "./Components/KendoDatePicker";
import KendoDropDown from "./Components/KendoDropDown";
import KendoText from "./Components/KendoText";
import KendoRadioButton from "./Components/KendoRadioButton";
import KendoCheckBox from "./Components/KendoCheckBox";
import { toast } from "react-hot-toast";
import "./registration-page.css";
function RegistrationPage() {
  const {
    componentsToRender,
    RegistrationPageFormData,
    setRegistrationPageFormData,
  } = useRegistrationPage();
  const [testList, setTestList] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const handleItemClick = (item) => {
    const itemIndex = selectedTests.indexOf(item);

    if (itemIndex === -1) {
      setSelectedTests([...selectedTests, item]);
    } else {
      const updatedItems = [...selectedTests];
      updatedItems.splice(itemIndex, 1);
      setSelectedTests(updatedItems);
    }
  };
  function getTestList() {
    axios
      .get("https://elabnextapi-dev.azurewebsites.net/api/TestMaster/GetTest")
      .then((response) => {
        setTestList(response.data.resultData.testList);
      });
  }

  useEffect(() => {
    getTestList();
  }, []);
  function updateRegistrationPageFormData() {
    // alert(JSON.stringify(RegistrationPageFormData));

    // localStorage.setItem(
    //   "savedRegistrationPageFormData",
    //   JSON.stringify(RegistrationPageFormData)
    // );

    const payload = {
      patientId: 8,
      patientDescription: RegistrationPageFormData,
    };

    axios
      .post(
        "https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/UpdatePatientRegistration",
        payload
      )
      .then(() => toast.success("Updated Successfully"))
      .catch((err) => console.log("err", err));
  }

  function retriveRegistrationPageFormData() {
    axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/GetPatientRegistration?PatientId=8"
      )
      .then((response) => {
        console.log(
          "ress",

          JSON.parse(response.data.resultData.patientList[0].patientDescription)
        );
        setRegistrationPageFormData(
          JSON.parse(response.data.resultData.patientList[0].patientDescription)
        );
        // setTestList(response.data.resultData.testList);
        const temp = response.data.resultData.patientList[0].patientDescription;

        const tt = JSON.parse(temp);

        setSelectedTests(tt.test);

        toast.success("Retrieved Successfully");
      })
      .catch((err) => console.log("errr getr e", err));
  }

  useEffect(() => {
    setRegistrationPageFormData({
      ...RegistrationPageFormData,
      test: selectedTests,
    });
  }, [selectedTests]);

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
            onClick={updateRegistrationPageFormData}
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
        <Button onClick={retriveRegistrationPageFormData}>
          get patient details{" "}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {componentsToRender?.map((component) => {
          return renderComponent(component);
        })}
      </div>
      <div
        style={{
          padding: "10px",
          height: "200px",
          overflowY: "scroll",
          marginTop: "10px",
          display: "flex",
        }}
      >
        <div
          style={{
            overflowY: "scroll",
            width: "50%",
            cursor: "pointer",
          }}
        >
          <h3>Test List</h3>
          {testList.length > 0 && (
            <div>
              {testList.map((test) => {
                return (
                  <div
                    className="selected-test"
                    onClick={() => handleItemClick(test.testName)}
                  >
                    {test.testName}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          style={{
            overflowY: "scroll",
            width: "50%",
            cursor: "pointer",
          }}
        >
          <h3>Selected Test List</h3>
          {selectedTests.length > 0 && (
            <div>
              {selectedTests.map((test) => {
                return (
                  <div
                    className="selected-test"
                    onClick={() => handleItemClick(test)}
                  >
                    {test}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { RegistrationPage };
