/** @format */

import { Button, Input, TileLayout } from "@progress/kendo-react-all";
import React, { useCallback, useState } from "react";

function RenderParameterList({
  parameterName,
  values,
  setValues,
  key,
  disabledTests,
  testIndex,
  ranges,
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
  // if (parameterName.testParamId === finalData.testParamId) {
  // }
  const [isInputHovered, setIsInputHovered] = useState(false);

  const handleInputMouseEnter = () => {
    setIsInputHovered(true);
  };

  const handleInputMouseLeave = () => {
    setIsInputHovered(false);
  };
  const handleChange = (e) => {
    const { unitId, unitName, testParamId, testParamName } = parameterName;

    setValues({
      ...values,
      [testParamId]: {
        unitId,
        unitName,
        testParamId,
        testParamName,
        paramValue: e.value,
        ranges,
      },
    });
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
            value={values[parameterName.testParamId]?.paramValue}
          />
          {isInputHovered && (
            <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
              <Button
                fillMode={isBold ? "solid" : "outline"}
                onClick={() => setIsBold(!isBold)}
              >
                B
              </Button>
              <Button
                fillMode={isItalic ? "solid" : "outline"}
                onClick={() => setIsItalic(!isItalic)}
              >
                I
              </Button>
              <Button
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
