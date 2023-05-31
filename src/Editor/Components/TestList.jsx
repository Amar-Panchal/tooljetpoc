/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  InputClearValue,
  InputPrefix,
  InputSeparator,
  InputSuffix,
  TextBox,
} from "@progress/kendo-react-inputs";
import Spinner from "@/_ui/Spinner";

export const TestList = (props) => {
  const {
    height,
    styles,
    PatientRegistrationFormData,
    setPatientRegistrationFormData,
  } = props;
  const { visibility, backgroundColor, borderRadius, textColor, onHoverColor } =
    styles;
  const [testList, setTestList] = useState([]);
  const [selectedTests, setSelectedTests] = useState(
    PatientRegistrationFormData.selectedTests || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [testListFiltered, setTestListFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

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

  async function getTestList() {
    setLoading(true);
    await axios
      .get("https://elabnextapi-dev.azurewebsites.net/api/TestMaster/GetTest")
      .then((response) => {
        setTestList(response.data.resultData.testList);
        setLoading(false);
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

  return (
    <div
      style={{
        display: visibility ? "" : "none",
        height,
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ height: props.height }}>
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
              height: "30px",
              backgroundColor: backgroundColor,
              color: textColor,
            }}
          />
          <div
            style={{
              height: props.height - 40,

              display: "flex",
            }}
          >
            <div
              style={{
                width: "50%",
                height: props.height - 30,
              }}
            >
              <h3 style={{ color: textColor }}>Test List</h3>
              <div
                style={{
                  height: props.height - 65,
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
            <div style={{ width: "50%", height: props.height - 30 }}>
              <h3 style={{ color: textColor }}>Selected Test List</h3>
              <div
                style={{
                  overflow: "scroll",
                  height: props.height - 65,
                }}
              >
                {selectedTests.map((test) => {
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
      )}
    </div>
  );
};
