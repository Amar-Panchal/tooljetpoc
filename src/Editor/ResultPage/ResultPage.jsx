/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import RenderParameterList from "./RenderParameterList";
import { UnitData } from "./StaticData";
import { Button } from "@progress/kendo-react-all";

function ResultPage() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [selectedTestsWithParameters, setSelectedTestsWithParameters] =
    useState([]);
  const [values, setValues] = useState({});
  const [testResult, setTestResult] = useState();
  const [unitData, setUnitData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setPatientDetails(history.location.state);
  }, [history]);

  const onTestChange = (event) => {
    const { testId } = JSON.parse(event.target.name);
    const itemIndex = selectedTestsWithParameters.findIndex(
      (test) => test.testId === testId
    );
    if (itemIndex === -1) {
      axios
        .get(
          `https://elabnextapi-dev.azurewebsites.net/api/Test/GetTestWithParameter?TestId=${testId}`
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
      id: 11,
      patientId: patientDetails.patientId,
      resultValues: {
        patientDetails,
        selectedTestsWithParameters,
        testResult,
      },
    };
    axios
      .put(
        "https://elabnextapi-dev.azurewebsites.net/api/Result/UpdateResult",
        payload
      )
      .then((response) => {
        toast.success("Saved Successfully");
      })
      .then(() => {
        history.push({
          pathname: "/applications/1/versions/1",
          state: { payload },
        });
      })
      .catch((error) => {
        console.log("sss", error);
      });
  };

  return (
    <div style={{ border: "1px solid transparent" }}>
      <div
        style={{
          position: "fixed",
          width: "58px",
          height: "100vh",
          top: "45px",
        }}
      >
        <img
          src="https://elabnextstorage.blob.core.windows.net/test/image_2023_04_25T07_21_59_615Z_Default_947499017.png"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "50px",
        }}
      >
        <img
          src="https://elabnextstorage.blob.core.windows.net/test/elab%20fial%202_Default_393598438.JPG"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        style={{
          width: "95%",
          padding: "20px",
          marginTop: "30px",
          marginLeft: "50px",
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
                  <b>Age:</b> {patientDetails?.age}
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
                {selectedTestsWithParameters.map((test) => {
                  return (
                    <div
                      style={{
                        border: "1px dotted gray",
                        padding: "15px",
                        margin: "10px",
                        borderRadius: "15px",
                      }}
                    >
                      <h3>{test.testName}</h3>
                      {test.testParameters.map((parameter) => {
                        return (
                          <RenderParameterList
                            parameterName={parameter}
                            values={values}
                            setValues={setValues}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
            <Button themeColor="primary" onClick={handleSubmitResult}>
              Submit
            </Button>
            <Button>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
