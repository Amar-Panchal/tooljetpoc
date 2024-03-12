/** @format */

import { Button, Input, TileLayout } from "@progress/kendo-react-all";
import React, { useEffect, useState } from "react";

function RenderParameterList({
  parameterName,
  values,
  setValues,
  key,
  disabledTests,
  testIndex,
  ranges,
  testDetails,
  valuesAPI,
}) {
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const styles = {
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    userSelect: "none",
  };

  const [isInputHovered, setIsInputHovered] = useState(false);
  console.log("arrr", values);

  useEffect(() => {
    setIsItalic(
      valuesAPI[testDetails.testId]?.parameterDetails[parameterName.testParamId]
        ?.isItalic
    );
    setIsBold(
      valuesAPI[testDetails.testId]?.parameterDetails[parameterName.testParamId]
        ?.isBold
    );
    setIsUnderline(
      valuesAPI[testDetails.testId]?.parameterDetails[parameterName.testParamId]
        ?.isUnderline
    );
  }, [valuesAPI]);

  const handleInputMouseEnter = () => {
    setIsInputHovered(true);
  };

  const handleInputMouseLeave = () => {
    setIsInputHovered(false);
  };

  const handleChange = (e) => {
    const { unitId, unitName, testParamId, testParamName } = parameterName;
    console.log("parameterName", parameterName);
    // setValues({
    //   ...values,
    //   [testParamId]: {
    //     ...values[testParamId],
    //     unitId,
    //     unitName,
    //     testParamId,
    //     testParamName,
    //     paramValue: e.value,
    //     ranges,
    //   },
    // });
    const { testId, testName } = testDetails;
    if (testId) {
      setValues({
        ...values,
        [testId]: {
          ...(values[testId] || {}), // Retrieve existing test details or create an empty object
          testName,
          testId,
          parameterDetails: {
            ...(values[testId]?.parameterDetails || {}), // Retrieve existing parameter details or create an empty object
            [testParamId]: {
              unitId,
              unitName,
              testParamId,
              testParamName,
              paramValue: e.value,
              ranges,
            },
          },
        },
      });
    }
  };

  const tiles = [
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: <span style={styles}>{parameterName.testParamName}</span>,
    },
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: (
        <span
          onMouseEnter={handleInputMouseEnter}
          onMouseLeave={handleInputMouseLeave}
          style={styles}
        >
          <Input
            id={parameterName.testParamId}
            name={parameterName.testParamId}
            style={{
              fontWeight: isBold ? "bold" : "",
              fontStyle: isItalic ? "italic" : "",
              textDecoration: isUnderline ? "underline" : "",
              width: "100%",
              border:
                disabledTests.includes(testIndex) || false
                  ? ""
                  : "1px solid black",
            }}
            onChange={handleChange}
            disabled={false || disabledTests.includes(testIndex)}
            value={
              values[testDetails.testId]?.parameterDetails[
                parameterName?.testParamId
              ]?.paramValue
            }
          />
          {isInputHovered && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                marginTop: "5px",
              }}
            >
              <Button
                style={{
                  color: isBold ? "white" : "",
                  backgroundColor: isBold ? "blue" : "",
                }}
                fillMode={isBold ? "solid" : "outline"}
                onClick={() => setIsBold(!isBold)}
              >
                B
              </Button>
              <Button
                style={{
                  color: isItalic ? "white" : "",
                  backgroundColor: isItalic ? "blue" : "",
                }}
                fillMode={isItalic ? "solid" : "outline"}
                onClick={() => setIsItalic(!isItalic)}
              >
                I
              </Button>
              <Button
                style={{
                  color: isUnderline ? "white" : "",
                  backgroundColor: isUnderline ? "blue" : "",
                }}
                fillMode={isUnderline ? "solid" : "outline"}
                onClick={() => setIsUnderline(!isUnderline)}
              >
                U
              </Button>
            </div>
          )}
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
      item: <span style={styles}>{parameterName?.unitName}</span>,
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
          {ranges.normalRange ? ranges.normalRange : ""}
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
      item: <span style={styles}>{ranges.criticalHigh}</span>,
    },
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: <span style={styles}>{ranges.criticalLow}</span>,
    },
  ];
  useEffect(() => {
    const { testId, testName } = testDetails;
    const { unitId, unitName, testParamId, testParamName, paramValue } =
      parameterName;

    setValues((prevValues) => {
      return {
        ...prevValues,
        [testId]: {
          ...(prevValues[testId] || {}),
          testName,
          testId,
          parameterDetails: {
            ...(prevValues[testId]?.parameterDetails || {}),
            [testParamId]: {
              ...prevValues[testId]?.parameterDetails[testParamId],
              isItalic,
              isUnderline,
              isBold,
            },
          },
        },
      };
    });
  }, [isItalic, isUnderline, isBold]);

  return (
    <TileLayout
      key={key}
      columns={6}
      rowHeight={100}
      gap={{
        rows: 10,
        columns: 10,
      }}
      items={tiles}
    />
  );
}

export default RenderParameterList;
