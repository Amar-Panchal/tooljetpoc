/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./registration-page.css";

import {
  InputClearValue,
  InputPrefix,
  InputSeparator,
  InputSuffix,
  TextBox,
} from "@progress/kendo-react-inputs";

function SelectTests({
  setPatientRegistrationFormData,
  PatientRegistrationFormData,
  textColor,
  onHoverColor,
  backgroundColor,
}) {
  console.log("PatientRegistrationFormData", PatientRegistrationFormData);
  const [testList, setTestList] = useState([]);
  const [selectedTests, setSelectedTests] = useState(
    PatientRegistrationFormData.selectedTests
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [testListFiltered, setTestListFiltered] = useState([]);

  const handleItemClick = (item) => {
    const { testId, testName, shortName } = item;
    const itemIndex = selectedTests.findIndex((test) => test.testId === testId);

    if (itemIndex === -1) {
      setSelectedTests([...selectedTests, { testId, testName, shortName }]);
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

  useEffect(() => {
    setTestListFiltered(testList);
  }, [testList]);

  useEffect(() => {
    setPatientRegistrationFormData({
      ...PatientRegistrationFormData,
      selectedTests: selectedTests,
    });
  }, [selectedTests]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.value);
  };

  useEffect(() => {
    const filteredList = testList.filter((item) => {
      return (
        item.testName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lioncCode?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setTestListFiltered(filteredList);
  }, [searchQuery]);
  console.log("selectedTests", selectedTests);
  return (
    <div style={{ height: "100%", padding: "10px" }}>
      <TextBox
        value={searchQuery}
        onChange={handleSearchQuery}
        placeholder="Search Test Name"
        prefix={() => (
          <>
            <InputPrefix>
              <span className="k-icon k-i-zoom"></span>
            </InputPrefix>
            <InputSeparator />
          </>
        )}
        style={{
          width: "50%",
          height: "20%",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      />
      <div style={{ height: "90%", display: "flex" }}>
        <div style={{ width: "50%", height: "90%" }}>
          <h3>Test List</h3>
          <div
            style={{
              height: "90%",
              overflow: "scroll",
            }}
          >
            {testListFiltered.map((test) => {
              return (
                <div
                  onClick={() => handleItemClick(test)}
                  key={test.testId}
                  style={{
                    cursor: "pointer",
                    color: textColor,
                    backgroundColor: backgroundColor,
                  }}
                  onMouseEnter={(event) => {
                    event.target.style.backgroundColor = onHoverColor;
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.backgroundColor = backgroundColor;
                  }}
                >
                  {` ${test.testName} (${
                    test.shortName ? test.shortName : ""
                  } ) `}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ width: "50%", height: "90%" }}>
          <h3>Selected Test List</h3>
          <div
            style={{
              overflow: "scroll",
              height: "90%",
            }}
          >
            {selectedTests.map((test) => {
              console.log("testt", test);
              return (
                <div
                  style={{
                    cursor: "pointer",
                    color: textColor,
                    backgroundColor: backgroundColor,
                  }}
                  onMouseEnter={(event) => {
                    event.target.style.backgroundColor = onHoverColor;
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.backgroundColor = backgroundColor;
                  }}
                  onClick={() => handleItemClick(test)}
                >
                  {` ${test.testName} (${
                    test.shortName ? test.shortName : ""
                  } ) `}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { SelectTests };
