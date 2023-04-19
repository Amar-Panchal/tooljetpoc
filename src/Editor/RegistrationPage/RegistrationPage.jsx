/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import KendoTextInput from "./Components/KendoTextInput";
import KendoButton from "./Components/KendoButton";
import useRegistrationPage from "./hooks/useRegistrationPage";
import KendoNumberInput from "./Components/KendoNumberInput";
import KendoDatePicker from "./Components/KendoDatePicker";
import KendoDropDown from "./Components/KendoDropDown";
import KendoText from "./Components/KendoText";
import KendoRadioButton from "./Components/KendoRadioButton";
import KendoCheckBox from "./Components/KendoCheckBox";
import { toast } from "react-hot-toast";
import "./registration-page.css";
import moment from "moment";
import { TileLayout } from "@progress/kendo-react-layout";
import { RadioButton } from "@progress/kendo-react-inputs";

function RegistrationPage() {
  const {
    componentsToRender,
    RegistrationPageFormData,
    setRegistrationPageFormData,
  } = useRegistrationPage();

  const [testList, setTestList] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [data, setData] = useState([]);

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
      })
      .catch((error) => console.log("error->getTestList", error));
  }

  useEffect(() => {
    getTestList();
  }, []);

  function saveRegistrationPageFormData() {
    const payload = {
      patientDescription: RegistrationPageFormData,
    };

    axios
      .post(
        "https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/SavePatientRegistration",
        payload
      )
      .then(() => toast.success("Created Successfully"))
      .catch((err) => console.log("err saveRegistrationPageFormData", err));
  }

  function retriveRegistrationPageFormData() {
    axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/GetPatientRegistration?PatientId=8"
      )
      .then((response) => {
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

  function renderComponent(component) {
    let componentType = component.component;
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
                [component.name]: moment(
                  e.target.value,
                  "ddd MMM DD YYYY HH:mm:ss z"
                ).format("DD/MM/YYYY"),
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
  console.log("RegistrationPageFormData", RegistrationPageFormData);
  useEffect(() => {
    setData(
      componentsToRender
        ?.filter(
          (component) =>
            component.component !== "Text" && component.component !== "Button"
        )
        .map((component, index) => ({
          col: (index % 4) + 1,
          colSpan: 1,
          rowSpan: 1,
          item: renderComponent(component),
          resizable: false,
          reorderable: false,
          style: { border: "none" },
        }))
    );
  }, [componentsToRender]);

  return (
    <div>
      <div style={{ padding: "50px" }}>
        {componentsToRender?.map((component) => {
          return component.component === "Text"
            ? renderComponent(component)
            : "";
        })}
      </div>
      <div>
        <TileLayout
          style={{
            background: "none",
          }}
          columns={4}
          items={data}
          positions={data}
          rowHeight={50}
        />
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
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {componentsToRender?.map((component) => {
          return component.component === "Button"
            ? renderComponent(component)
            : "";
        })}
      </div>
    </div>
  );
}

export { RegistrationPage };
