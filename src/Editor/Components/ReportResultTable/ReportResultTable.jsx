/** @format */

import React, { useEffect, useState, useRef } from "react";
import { isEqual } from "lodash";

import { SelectTests } from "../../RegistrationPage/test";

export const ReportResultTable = (props) => {
  const {
    height,
    properties,
    styles,
    id,
    setExposedVariable,
    exposedVariables,
    fireEvent,
    dataQueries,
    dataCy,
    setPatientRegistrationFormData,
    PatientRegistrationFormData,
    testResultData,
  } = props;
  const { backgroundColor, textColor } = styles;

  console.log("testresultdata", testResultData);
  return (
    <div
      className="card"
      style={{
        height,
        border: "none",
        backgroundColor,
        color: textColor,
      }}
      data-cy={dataCy}
    >
      {/* <iframe
        srcDoc={iframeContent}
        style={{ width: '100%', height: '100%', border: 'none' }}
        ref={iFrameRef}
        data-id={id}
      ></iframe> */}

      {/* <SelectTests
        setPatientRegistrationFormData={setPatientRegistrationFormData}
        PatientRegistrationFormData={PatientRegistrationFormData}
      /> */}
      <div>
        <table className="fixed_headers" style={{ width: "100%" }}>
          <tbody style={{ width: "100%" }}>
            <tr
              style={{
                height: "40px",
              }}
            >
              <td
                style={{
                  width: "40%",
                }}
              >
                <h3> Parameter Name</h3>
              </td>
              <td
                style={{
                  width: "20%",
                }}
              >
                <h3> Value</h3>
              </td>
              <td style={{ width: "20%" }}>
                <h3>Unit Name</h3>
              </td>
              <td style={{ width: "20%" }}>
                <h3>demo Col</h3>
              </td>
            </tr>
            {testResultData?.map((testResult) => {
              return (
                <tr
                  style={{
                    marginTop: "20px",

                    padding: "10px",
                    height: "40px",
                  }}
                >
                  <td
                    style={{
                      width: "40%",
                    }}
                  >
                    {testResult.testParamName}
                  </td>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {testResult.paramValue}
                  </td>
                  <td style={{ width: "20%" }}>{testResult.unitName}</td>
                  <td style={{ width: "20%" }}> -</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
