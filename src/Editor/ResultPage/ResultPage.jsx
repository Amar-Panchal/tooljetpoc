/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import RenderParameterList from "./RenderParameterList";
import { UnitData } from "./StaticData";
import { TileLayout } from "@progress/kendo-react-all";
import { Button } from "@progress/kendo-react-buttons";
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
  const [testResult, setTestResult] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [values, setValues] = useState({});
  const [disabledTests, setDisabledTests] = useState([]);

  const history = useHistory();

  function convertAgeToDays(age, type) {
    if (type === "Year") {
      return age * 365;
    } else if (type === "Month") {
      return age * 30;
    } else if (type === "Day") {
      return age;
    } else {
      return -1; // Invalid age type
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
      return -1; // Invalid gender
    }
  }
  console.log("values", values);
  useEffect(() => {
    setPatientDetails(history.location.state);
  }, [history]);

  const onTestChange = (event) => {
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
      axios
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
        })
        .catch((error) => {
          console.log("error onTestChange ", error);
        });
    } else {
      const updatedItems = [...selectedTestsWithParameters];
      updatedItems.splice(itemIndex, 1);
      setSelectedTestsWithParameters(updatedItems);
    }
  };
  useEffect(() => {
    const arr = Object.entries(values).map(([key, value]) => value);

    setTestResult(arr);
  }, [values]);

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
  const handleSubmitResult = () => {
    const payload = {
      patientId: patientDetails.patientId,
      resultValues: {
        patientDetails,
        selectedTestsWithParameters,
        testResult,
      },
    };
    axios
      .post(
        "https://elabnextapi-dev.azurewebsites.net/api/Result/SaveResult",
        payload
      )
      .then((response) => {
        toast.success("Saved Successfully");
      })
      .then(() => {
        history.push({
          pathname: "/test-result-report",
          state: {
            payload,
            reportrenderidd: patientDetails.patientId === 228 ? 124 : 45,
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
      // Disable all tests
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
              <div style={{ padding: "10px" }}>
                <h1>Patient Details</h1>
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
          {selectedTestsWithParameters.length > 0 && (
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
                                return (
                                  <RenderParameterList
                                    parameterName={parameter}
                                    values={values}
                                    setValues={setValues}
                                    key={paramIndex}
                                    disabledTests={disabledTests}
                                    testIndex={testIndex}
                                    ranges={
                                      parameter?.ranges[0]?.rangeMaster
                                        ? parameter?.ranges[0]?.rangeMaster
                                        : {}
                                    }
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
                    {disabledTests.length === selectedTestsWithParameters.length
                      ? "Edit All"
                      : "Authorized All"}
                  </Button>
                </div>
              </div>
            </div>
          )}
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
                !(disabledTests.length === selectedTestsWithParameters.length)
              }
            >
              Print
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
        </div>
      </div>
      {/* <MyComponent /> */}
    </div>
  );
}

export default ResultPage;
