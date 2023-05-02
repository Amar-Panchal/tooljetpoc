/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./registration-page.css";
import { Input } from "@progress/kendo-react-all";

function SelectTests({
  setPatientRegistrationFormData,
  PatientRegistrationFormData,
  textColor,
}) {
  const [testList, setTestList] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [testListFiltered, setTestListFiltered] = useState([]);

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
    const filteredList = testList.filter((item) =>
      item.testName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTestListFiltered(filteredList);
  }, [searchQuery]);
  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div
        style={{
          border: "1px solid #EBEBEB",
          width: "300px",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <span class="k-icon k-i-zoom"></span>

        <Input
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Search Test Name"
          style={{
            border: "none",
          }}
        />
      </div>
      <div
        style={{
          overflowY: "scroll",
          overflow: "hidden",
          display: "flex",
          width: "100%",
          padding: "10px",
          backgroundColor: "none",
          color: textColor,
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
          {testListFiltered.length > 0 && (
            <div>
              {testListFiltered.map((test) => {
                return (
                  <div
                    className="selected-test"
                    onClick={() => handleItemClick(test)}
                  >
                    {` ${test.testName} (${
                      test.shortName ? test.shortName : ""
                    } ) `}
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
    </div>
  );
}

export { SelectTests };
