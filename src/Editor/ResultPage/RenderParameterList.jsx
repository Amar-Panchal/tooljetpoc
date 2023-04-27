/** @format */

import { Input, TileLayout } from "@progress/kendo-react-all";
import React, { useCallback, useState } from "react";

function RenderParameterList({ parameterName, values, setValues }) {
  const styles = {
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    userSelect: "none",
  };
  // if (parameterName.testParamId === finalData.testParamId) {
  // }
  const randomNumb = Math.floor(Math.random() * 90) + 10;

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
            style={{ width: "100%" }}
            onChange={handleChange}
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
      item: (
        <span style={styles}>{`${randomNumb} - ${
          randomNumb + Math.floor(Math.random() * 90) + 10
        }`}</span>
      ),
    },
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: <span style={styles}>{Math.floor(Math.random() * 90)}</span>,
    },
    {
      defaultPosition: {
        colSpan: 1,
        rowSpan: 1,
      },
      resizable: false,
      reorderable: false,
      item: <span style={styles}>{Math.floor(Math.random() * 90)}</span>,
    },
  ];
  return (
    <TileLayout
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
