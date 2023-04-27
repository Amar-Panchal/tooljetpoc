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
  const { visibility } = styles;
  const { code, data } = properties;
  const [customProps, setCustomProps] = useState(data);
  const iFrameRef = useRef(null);
  const dataQueryRef = useRef(dataQueries);
  const customPropRef = useRef(data);

  useEffect(() => {
    setCustomProps(data);
    customPropRef.current = data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (!isEqual(exposedVariables.data, customProps)) {
      setExposedVariable("data", customProps);
      sendMessageToIframe({ message: "DATA_UPDATED" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setExposedVariable, customProps, exposedVariables.data]);

  useEffect(() => {
    sendMessageToIframe({ message: "CODE_UPDATED" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    dataQueryRef.current = dataQueries;
  }, [dataQueries]);

  useEffect(() => {
    window.addEventListener("message", (e) => {
      try {
        if (e.data.from === "customComponent" && e.data.componentId === id) {
          if (e.data.message === "UPDATE_DATA") {
            setCustomProps({ ...customPropRef.current, ...e.data.updatedObj });
          } else if (e.data.message === "RUN_QUERY") {
            const filteredQuery = dataQueryRef.current.filter(
              (query) => query.name === e.data.queryName
            );
            filteredQuery.length === 1 &&
              fireEvent("onTrigger", {
                queryId: filteredQuery[0].id,
                queryName: filteredQuery[0].name,
              });
          } else {
            sendMessageToIframe(e.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageToIframe = ({ message }) => {
    if (!iFrameRef.current) return;
    switch (message) {
      case "INIT":
        return iFrameRef.current.contentWindow.postMessage(
          {
            message: "INIT_RESPONSE",
            componentId: id,
            data: customProps,
            code: code,
          },
          "*"
        );
      case "CODE_UPDATED":
        return iFrameRef.current.contentWindow.postMessage(
          {
            message: "CODE_UPDATED",
            componentId: id,
            data: customProps,
            code: code,
          },
          "*"
        );
      case "DATA_UPDATED":
        return iFrameRef.current.contentWindow.postMessage(
          {
            message: "DATA_UPDATED",
            componentId: id,
            data: customProps,
          },
          "*"
        );
      default:
        return;
    }
  };
  console.log("testresultdata", testResultData);
  return (
    <div
      className="card"
      style={{ display: visibility ? "" : "none", height }}
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
