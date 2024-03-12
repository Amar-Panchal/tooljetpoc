/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import RenderParameterList from "./RenderParameterList";
import { Menu, MenuItem, TileLayout } from "@progress/kendo-react-all";
import { Button } from "@progress/kendo-react-buttons";
import CustomSpinningLoader from "../../_ui/Loader/Loader";

const styles = {
  fontSize: 14,
  textAlign: "center",
  margin: "auto",
  userSelect: "none",
};

const tiles = [
  {
    defaultPosition: {
      colSpan: 1,
      rowSpan: 1,
    },
    resizable: false,
    reorderable: false,
    item: (
      <span style={styles}>
        <b>Parameter Name</b>
      </span>
    ),
  },
  {
    defaultPosition: {
      colSpan: 1,
      rowSpan: 1,
    },
    resizable: false,
    reorderable: false,
    item: (
      <span style={styles}>
        <b>Result</b>
      </span>
    ),
  },
  {
    defaultPosition: {
      colSpan: 1,
      rowSpan: 1,
    },
    resizable: false,
    reorderable: false,
    item: (
      <span style={styles}>
        <b>Unit</b>
      </span>
    ),
  },
  {
    defaultPosition: {
      colSpan: 1,
      rowSpan: 1,
    },
    resizable: false,
    reorderable: false,
    item: (
      <span style={styles}>
        <b>Normal Range </b>{" "}
      </span>
    ),
  },
  {
    defaultPosition: {
      colSpan: 1,
      rowSpan: 1,
    },
    resizable: false,
    reorderable: false,
    item: (
      <span style={styles}>
        <b>Critical High</b>{" "}
      </span>
    ),
  },
  {
    defaultPosition: {
      colSpan: 1,
      rowSpan: 1,
    },
    resizable: false,
    reorderable: false,
    item: (
      <span style={styles}>
        <b>Critical Low</b>{" "}
      </span>
    ),
  },
];

function ResultPage() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [selectedTestsWithParameters, setSelectedTestsWithParameters] =
    useState([]);

  const [unitData, setUnitData] = useState([]);
  const [values, setValues] = useState([]);
  const [valuesAPI, setValuesAPI] = useState({});
  const [disabledTests, setDisabledTests] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  console.log("valuedddds", Object.keys(valuesAPI).length === 0);
  const history = useHistory();

  function convertAgeToDays(age, type) {
    if (type === "Year") {
      return age * 365;
    } else if (type === "Month") {
      return age * 30;
    } else if (type === "Day") {
      return age;
    } else {
      return -1;
    }
  }
  function convertGenderToValue(gender) {
    if (gender === "Male") {
      return 2;
    } else if (gender === "Female") {
      return 1;
    } else if (gender === "Both") {
      return 3;
    } else {
      return -1;
    }
  }
  console.log("valuesAPI", history);
  useEffect(() => {
    setPatientDetails(history.location.state);
  }, [history]);

  const onTestChange = async (event) => {
    setIsloading(true);
    const { testId } = JSON.parse(event.target.name);
    const itemIndex = selectedTestsWithParameters.findIndex(
      (test) => test.testId === testId
    );

    const ageInDays = convertAgeToDays(
      patientDetails.age.value,
      patientDetails.age.ageType
    );
    const genderVal = convertGenderToValue(patientDetails.gender.name);

    if (itemIndex === -1) {
      await axios
        .get(
          `https://elabnextapi-dev.azurewebsites.net/api/Test/GetTestWithParameter?TestId=${testId}&Gender=${genderVal}&Age=${ageInDays}`
        )
        .then((response) => {
          const { testId, testName, testParameters } =
            response.data.resultData.testList[0];

          testParameters.map((parameter) => {
            const unitName = unitData?.filter((unit) => {
              if (unit.unitId === parameter.unitId)
                return unit.unitId === parameter.unitId;
            });
            parameter.unitName = unitName[0]?.unitName;
          });

          setSelectedTestsWithParameters([
            ...selectedTestsWithParameters,
            { testId, testName, testParameters },
          ]);
          setIsloading(false);
        })
        .catch((error) => {
          console.log("error onTestChange ", error);
          setIsloading(false);
        });
    } else {
      const updatedItems = [...selectedTestsWithParameters];
      updatedItems.splice(itemIndex, 1);
      setSelectedTestsWithParameters(updatedItems);
    }

    await axios
      .get(
        `https://elabnextapi-dev.azurewebsites.net/api/Result/GetResult?PatientId=${patientDetails.patientId}`
      )
      .then((response) => {
        const maxIdObject = response.data.resultData.resultList.reduce(
          (maxObject, currentObject) => {
            return currentObject.id > maxObject.id ? currentObject : maxObject;
          },
          response.data.resultData.resultList[0]
        );

        let temp = JSON.parse(maxIdObject.resultValues);

        setValues((prevValues) => ({
          ...prevValues,
          [testId]: temp.testResult[testId],
        }));
        console.log("arrr2", values);

        setValuesAPI((prevValues) => ({
          ...prevValues,
          [testId]: temp.testResult[testId],
        }));
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        console.log("errror ->GetResult", error);
      });
  };

  console.log("select", selectedTestsWithParameters);
  useEffect(() => {
    axios
      .get("https://elabnextapi-dev.azurewebsites.net/api/TestMaster/GetUnit")
      .then((response) => {
        const { unitMasterList } = response.data.resultData;
        setUnitData(unitMasterList);
      });
  }, []);

  // useEffect(() => {
  //   mapRangesWithParameters();
  // }, [selectedTestsWithParameters]);

  // console.log("aaaa", ResultDataWithRanges);
  // console.log("resultt", testResult);

  // useEffect(() => {
  //   const temp = [];
  //   testResult.map((testresult) => {
  //     ResultDataWithRanges.map((resultData) => {
  //       // console.log("testresult", testresult);
  //       if (testresult.testParamId === resultData.testParamId) {
  //         temp.push({
  //           ...testresult,
  //           ...resultData,
  //         });
  //       }
  //     });
  //   });

  //   setFinalData(temp);
  // }, [testResult]);

  //save
  // const handleSubmitResult = () => {
  //   const payload = {
  //     patientId: patientDetails.patientId,
  //     resultValues: {
  //       patientDetails,
  //       selectedTestsWithParameters,
  //       testResult,
  //     },
  //   };
  //   axios
  //     .post(
  //       "https://elabnextapi-dev.azurewebsites.net/api/Result/SaveResult",
  //       payload
  //     )
  //     .then((response) => {
  //       console.log("fff", response);
  //       toast.success("Saved Successfully");
  //     })
  //     .then(() => {
  //       history.push({
  //         pathname: "/applications/1/versions/1",
  //         state: { payload },
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("sss", error);
  //     });
  // };

  //update
  const handleSubmitResult = async () => {
    setIsloading(true);

    const payload = {
      patientId: patientDetails.patientId,
      resultValues: {
        patientDetails,
        selectedTestsWithParameters,
        testResult: values,
      },
    };
    console.log("payload", payload);
    await axios
      .post(
        "https://elabnextapi-dev.azurewebsites.net/api/Result/SaveResult",
        payload
      )
      .then((response) => {
        setIsloading(false);
        toast.success("Saved Successfully");
      })
      .then(() => {
        history.push({
          pathname: "/test-result-report",
          state: {
            patientId: patientDetails.patientId,
          },
        });
      })
      .catch((error) => {
        console.log("sss", error);
      });
  };

  const handleDisableTest = (testIndex) => {
    if (disabledTests.includes(testIndex)) {
      // If test is already disabled, remove it from the disabledTests array
      setDisabledTests(disabledTests.filter((index) => index !== testIndex));
    } else {
      // If test is not disabled, add it to the disabledTests array
      setDisabledTests([...disabledTests, testIndex]);
    }
  };
  const handleDisableAll = () => {
    if (disabledTests.length === 0) {
      setDisabledTests(
        Array.from(
          { length: selectedTestsWithParameters.length },
          (_, index) => index
        )
      );
    } else {
      // Enable all tests
      setDisabledTests([]);
    }
  };

  // function MyComponent() {
  //   const [disabledTests, setDisabledTests] = useState([]);

  //   const handleDisableTest = (testIndex) => {
  //     if (disabledTests.includes(testIndex)) {
  //       // If test is already disabled, remove it from the disabledTests array
  //       setDisabledTests(disabledTests.filter((index) => index !== testIndex));
  //     } else {
  //       // If test is not disabled, add it to the disabledTests array
  //       setDisabledTests([...disabledTests, testIndex]);
  //     }
  //   };

  //   const handleDisableAll = () => {
  //     if (disabledTests.length === 0) {
  //       // Disable all tests
  //       setDisabledTests(
  //         Array.from({ length: testList.length }, (_, index) => index)
  //       );
  //     } else {
  //       // Enable all tests
  //       setDisabledTests([]);
  //     }
  //   };

  //   // Example test list with parameters
  //   const testList = [
  //     {
  //       name: "Test 1",
  //       parameters: ["Param 1", "Param 2", "Param 3"],
  //     },
  //     {
  //       name: "Test 2",
  //       parameters: ["Param 1", "Param 2"],
  //     },
  //     {
  //       name: "Test 3",
  //       parameters: ["Param 1", "Param 2", "Param 3", "Param 4"],
  //     },
  //   ];

  //   return (
  //     <div>
  //       <button onClick={handleDisableAll}>
  //         {disabledTests.length === testList.length
  //           ? "Enable All"
  //           : "Disable All"}
  //       </button>
  //       {testList.map((test, testIndex) => (
  //         <div key={testIndex}>
  //           <h3>{test.name}</h3>
  //           {test.parameters.map((param, paramIndex) => (
  //             <div key={paramIndex}>
  //               <input
  //                 type="text"
  //                 value={param}
  //                 disabled={disabledTests.includes(testIndex)}
  //               />
  //             </div>
  //           ))}
  //           <button onClick={() => handleDisableTest(testIndex)}>
  //             {disabledTests.includes(testIndex) ? "Enable" : "Disable"}
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  const TagsComponent = () => {
    const [colors, setColors] = useState([
      { text: "Red", color: "#FF0000" },
      { text: "Orange", color: "#FFA500" },
      { text: "Yellow", color: "#FFFF00" },
      { text: "Green", color: "#008000" },
      { text: "Blue", color: "#0000FF" },
      { text: "Indigo", color: "#4B0082" },
      { text: "Violet", color: "#EE82EE" },
    ]);
    const [searchValue, setSearchValue] = useState("");
    const [newColor, setNewColor] = useState("");
    const [isHover, setIsHover] = useState(-10);

    const handleSearchChange = (e) => {
      setSearchValue(e.target.value);
    };

    const handleAddColor = () => {
      if (searchValue && newColor) {
        setColors([...colors, { text: searchValue, color: newColor }]);
        setNewColor("");
        setSearchValue("");
      }
    };

    return (
      <div
        style={{
          maxWidth: "150px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search tag..."
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            fontSize: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <ul
          style={{
            listStyle: "none",
            padding: "0",
            width: "100%",
            margin: "0",
          }}
        >
          {colors
            .filter((color) =>
              color.text.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((color, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  borderBottom: "1px solid #ccc",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  backgroundColor: isHover === index ? "#E6F3FF" : "",
                  transform: isHover === index ? "scale(1.1)" : "",
                }}
                onMouseEnter={() => setIsHover(index)}
                onMouseLeave={() => setIsHover("")}
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                    backgroundColor: color.color,
                    borderRadius: "25px",
                  }}
                ></div>
                <span>{color.text}</span>
              </li>
            ))}
        </ul>

        {searchValue &&
          !colors.some(
            (color) => color.text.toLowerCase() === searchValue.toLowerCase()
          ) && (
            <>
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginTop: "10px",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  backgroundColor: isHover === -1 ? "#E6F3FF" : "",
                  transform: isHover === -1 ? "scale(1.1)" : "",
                }}
                onMouseEnter={() => setIsHover(-1)}
                onMouseLeave={() => setIsHover("")}
              >
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  style={{
                    marginRight: "10px",
                    width: "20px",
                    height: "20px",
                    border: "none",
                    borderRadius: "50%",
                    padding: "0",
                    cursor: "pointer",
                  }}
                />
                <button
                  onClick={handleAddColor}
                  style={{
                    border: "none",
                    padding: "5px 10px",
                    fontSize: "12px",
                    borderRadius: "4px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Add {searchValue}
                </button>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  marginTop: "0px",
                  fontStyle: "italic",
                  color: "#007bff",
                }}
              >
                Add Text & color
              </span>
            </>
          )}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          padding: "20px",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            fontStyle: "normal",
            fontSize: "30px",
            lineHeight: "50px",
            display: "flex",
            alignItems: "center",
            color: "#212529",
            marginLeft: "30px",
          }}
        >
          Result
        </div>
        <div
          style={{
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                // flexWrap: "wrap",
                justifyContent: "space-evenly",
                padding: "20px",
                border: "1px dotted gray",
                borderRadius: "15px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h1>Patient Details</h1>

                <Menu>
                  <MenuItem
                    cssStyle={{
                      color: "black",
                      margin: "20px",
                      cursor: "pointer",
                    }}
                    text="Tags"
                    contentRender={TagsComponent}
                  ></MenuItem>
                </Menu>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <div>
                  <b> Patient Name :</b> {patientDetails?.patientName}
                </div>
                <div>
                  <b>Age:</b>{" "}
                  {patientDetails?.age?.value +
                    " " +
                    patientDetails?.age?.ageType}
                </div>
                <div>
                  <b>Gender :</b> {patientDetails?.gender?.name}
                </div>
                <div>
                  <b>Membership Type</b> :{" "}
                  {patientDetails?.membershipType?.label}
                </div>
                <div>
                  <b>Referred Doctor</b> : {patientDetails?.referredDoctor}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",

              padding: "20px",
              border: "1px dotted gray",
              borderRadius: "15px",
            }}
          >
            <div>
              <h1>Selected Tests</h1>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-evenly",
              }}
            >
              {patientDetails?.selectedTests?.map((test) => {
                return (
                  <div>
                    <Checkbox
                      name={JSON.stringify(test)}
                      label={test?.testName}
                      onChange={onTestChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <CustomSpinningLoader />
          ) : selectedTestsWithParameters.length > 0 &&
            Object.keys(valuesAPI).length === 0 ? (
            <CustomSpinningLoader />
          ) : (
            <div
              style={{
                margin: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  border: "1px dotted gray",
                  borderRadius: "15px",
                }}
              >
                <h1>Parameters</h1>
                <div>
                  {selectedTestsWithParameters.map((test, testIndex) => {
                    return (
                      <div
                        style={{
                          border: "1px dotted gray",
                          padding: "15px",
                          margin: "10px",
                          borderRadius: "15px",
                        }}
                        key={testIndex}
                      >
                        {test.testParameters.length > 0 ? (
                          <div>
                            <h3>{test.testName}</h3>

                            <TileLayout
                              columns={6}
                              rowHeight={50}
                              gap={{
                                rows: 10,
                                columns: 10,
                              }}
                              items={tiles}
                            />
                            {test.testParameters.map(
                              (parameter, paramIndex) => {
                                console.log("parameterName", parameter);
                                return (
                                  <RenderParameterList
                                    parameterName={parameter}
                                    values={values}
                                    setValues={setValues}
                                    valuesAPI={valuesAPI}
                                    key={paramIndex}
                                    disabledTests={disabledTests}
                                    testIndex={testIndex}
                                    ranges={
                                      parameter?.ranges[0]?.rangeMaster
                                        ? parameter?.ranges[0]?.rangeMaster
                                        : {}
                                    }
                                    testDetails={test}
                                  />
                                );
                              }
                            )}

                            <Button
                              style={{
                                color: disabledTests.includes(testIndex)
                                  ? ""
                                  : "white",
                                backgroundColor: disabledTests.includes(
                                  testIndex
                                )
                                  ? ""
                                  : "blue",
                              }}
                              onClick={() => {
                                toast.success("Authorized Successfully");
                                handleDisableTest(testIndex);
                              }}
                            >
                              {disabledTests.includes(testIndex)
                                ? "Authorized"
                                : "Authorize"}
                            </Button>
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <h4>No Parameter Found</h4>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {selectedTestsWithParameters.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      style={{
                        color:
                          disabledTests.length ===
                          selectedTestsWithParameters.length
                            ? ""
                            : "white",
                        backgroundColor:
                          disabledTests.length ===
                          selectedTestsWithParameters.length
                            ? ""
                            : "blue",
                        width: "100px",
                      }}
                      onClick={handleDisableAll}
                    >
                      {disabledTests.length ===
                      selectedTestsWithParameters.length
                        ? "Edit All"
                        : "Authorized All"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedTestsWithParameters.length > 0 &&
            Object.keys(valuesAPI).length > 0 && (
              <div
                style={{
                  border: "1px dotted gray",
                  padding: "15px",
                  margin: "20px",
                  display: "flex",
                  borderRadius: "15px",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  style={{ color: "white", backgroundColor: "blue" }}
                  onClick={handleSubmitResult}
                  disabled={
                    !(
                      disabledTests.length ===
                      selectedTestsWithParameters.length
                    )
                  }
                >
                  Print
                </Button>
                <Button
                  style={{ color: "white", backgroundColor: "blue" }}
                  onClick={handleSubmitResult}
                  disabled={
                    !(
                      disabledTests.length ===
                      selectedTestsWithParameters.length
                    )
                  }
                >
                  Preview
                </Button>

                <Button
                  onClick={() => {
                    history.push({
                      pathname: "/",
                      state: {},
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
        </div>
      </div>
      {/* <MyComponent /> */}
    </div>
  );
}

export default ResultPage;
