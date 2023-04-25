/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./registration-page.css";

function SelectTests({
  setPatientRegistrationFormData,
  PatientRegistrationFormData,
}) {
  const [testList, setTestList] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  const handleItemClick = (item) => {
    const { testId, testName } = item;

    const itemIndex = selectedTests.findIndex((test) => test.testId === testId);

    if (itemIndex === -1) {
      setSelectedTests([...selectedTests, { testId, testName }]);
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
    setPatientRegistrationFormData({
      ...PatientRegistrationFormData,
      selectedTests: selectedTests,
    });
  }, [selectedTests]);
  return (
    <div
      style={{
        overflowY: "scroll",
        display: "flex",
        width: "100%",
        padding: "10px",
        backgroundColor: "none",
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
                  onClick={() => handleItemClick(test)}
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
              return <div className="selected-test">{test.testName}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export { SelectTests };
