/** @format */

import { Input, TileLayout } from "@progress/kendo-react-all";
import React, { useCallback, useState } from "react";

function RenderParameterList({
  parameterName,
  values,
  setValues,
  key,
  disabledTests,
  testIndex,
  disabledAllTests,
}) {
  const styles = {
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    userSelect: "none",
  };
  // if (parameterName.testParamId === finalData.testParamId) {
  // }
  const randomNumb = 10;

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
        <span style={styles}>
          <Input
            id={parameterName.testParamId}
            name={parameterName.testParamId}
            style={{
              width: "100%",
              border:
                disabledTests.includes(testIndex) || disabledAllTests
                  ? ""
                  : "1px solid black",
            }}
            onChange={handleChange}
            disabled={disabledAllTests || disabledTests.includes(testIndex)}
          />
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
      item: <span style={styles}>{`${randomNumb} - ${randomNumb + 30}`}</span>,
    },
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: <span style={styles}>{90}</span>,
    },
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: <span style={styles}>{10}</span>,
    },
  ];
  return (
    <TileLayout
      key={key}
      columns={6}
      rowHeight={50}
      gap={{
        rows: 10,
        columns: 10,
      }}
      items={tiles}
    />
  );
}

export default RenderParameterList;
