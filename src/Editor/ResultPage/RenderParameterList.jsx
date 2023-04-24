/** @format */

import { TileLayout } from "@progress/kendo-react-all";
import React from "react";

function RenderParameterList(parameterName) {
  const styles = {
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    userSelect: "none",
  };
  console.log("aaa", parameterName);
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
          <input style={{ width: "100%" }} />
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
      item: <span style={styles}>Tile 4</span>,
    },
  ];
  return (
    <div>
      {/* <ul>
        <li> {parameterName.testParamName} </li>
      </ul> */}

      <TileLayout
        columns={4}
        rowHeight={50}
        gap={{
          rows: 10,
          columns: 10,
        }}
        items={tiles}
      />
    </div>
  );
}

export default RenderParameterList;
