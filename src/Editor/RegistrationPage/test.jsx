/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./registration-page.css";

function SelectTests() {
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

  return (
    <div>
      <div
        style={{
          padding: "10px",
          height: "200px",
          overflowY: "scroll",
          margin: "10px",
          display: "flex",
          width: "100%",
          border: "1px dotted gray",
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

export { SelectTests };