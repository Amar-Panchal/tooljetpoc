/** @format */

import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Container";
import { Confirm } from "./Viewer/Confirm";
import Pdf from "react-to-pdf";
import { ViewerNavigation } from "./Viewer/ViewerNavigation";
import {
  onComponentOptionChanged,
  onComponentOptionsChanged,
  onComponentClick,
  onQueryConfirmOrCancel,
  onEvent,
  runQuery,
  computeComponentState,
} from "@/_helpers/appUtils";
import queryString from "query-string";
import ViewerLogoIcon from "./Icons/viewer-logo.svg";
// import { DataSourceTypes } from './DataSourceManager/SourceComponents';
import {
  resolveReferences,
  safelyParseJSON,
  stripTrailingSlash,
} from "@/_helpers/utils";
import { withTranslation } from "react-i18next";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import Spinner from "@/_ui/Spinner";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ApiCallParams } from "./StaticApiCall";
const temp = {
  id: "42af8904-10f3-43e9-a76d-984feb4a8cc4",
  name: "2",
  definition: {
    showViewerNavigation: true,
    homePageId: "3f4387dd-09d1-4742-8ff8-741874c5f039",
    pages: {
      "3f4387dd-09d1-4742-8ff8-741874c5f039": {
        components: {
          "151b2ae8-5fb3-4d2b-b597-cae01de26ca4": {
            component: {
              properties: {
                title: {
                  type: "string",
                  displayName: "Title",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                data: {
                  type: "code",
                  displayName: "Table data",
                  validation: {
                    schema: {
                      type: "array",
                      element: {
                        type: "object",
                      },
                      optional: true,
                    },
                  },
                },
                loadingState: {
                  type: "toggle",
                  displayName: "Loading state",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                columns: {
                  type: "array",
                  displayName: "Table Columns",
                },
                rowsPerPage: {
                  type: "code",
                  displayName: "Number of rows per page",
                  validation: {
                    schema: {
                      type: "union",
                      schemas: [
                        {
                          type: "string",
                        },
                        {
                          type: "number",
                        },
                      ],
                    },
                  },
                },
                serverSidePagination: {
                  type: "toggle",
                  displayName: "Server-side pagination",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                enableNextButton: {
                  type: "toggle",
                  displayName: "Enable next page button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                enabledSort: {
                  type: "toggle",
                  displayName: "Enable sorting",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                hideColumnSelectorButton: {
                  type: "toggle",
                  displayName: "Hide column selector button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                enablePrevButton: {
                  type: "toggle",
                  displayName: "Enable previous page button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                totalRecords: {
                  type: "code",
                  displayName: "Total records server side",
                  validation: {
                    schema: {
                      type: "union",
                      schemas: [
                        {
                          type: "string",
                        },
                        {
                          type: "number",
                        },
                      ],
                    },
                  },
                },
                clientSidePagination: {
                  type: "toggle",
                  displayName: "Client-side pagination",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                serverSideSearch: {
                  type: "toggle",
                  displayName: "Server-side search",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                serverSideSort: {
                  type: "toggle",
                  displayName: "Server-side sort",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                serverSideFilter: {
                  type: "toggle",
                  displayName: "Server-side filter",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                actionButtonBackgroundColor: {
                  type: "color",
                  displayName: "Background color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                actionButtonTextColor: {
                  type: "color",
                  displayName: "Text color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                displaySearchBox: {
                  type: "toggle",
                  displayName: "Show search box",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                showDownloadButton: {
                  type: "toggle",
                  displayName: "Show download button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                showFilterButton: {
                  type: "toggle",
                  displayName: "Show filter button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                showBulkUpdateActions: {
                  type: "toggle",
                  displayName: "Show update buttons",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                showBulkSelector: {
                  type: "toggle",
                  displayName: "Bulk selection",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                highlightSelectedRow: {
                  type: "toggle",
                  displayName: "Highlight selected row",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
              },
              general: {
                tooltip: {
                  type: "code",
                  displayName: "Tooltip",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              others: {
                showOnDesktop: {
                  type: "toggle",
                  displayName: "Show on desktop ",
                },
                showOnMobile: {
                  type: "toggle",
                  displayName: "Show on mobile",
                },
              },
              events: {
                onRowHovered: {
                  displayName: "Row hovered",
                },
                onRowClicked: {
                  displayName: "Row clicked",
                },
                onBulkUpdate: {
                  displayName: "Save changes",
                },
                onPageChanged: {
                  displayName: "Page changed",
                },
                onSearch: {
                  displayName: "Search",
                },
                onCancelChanges: {
                  displayName: "Cancel changes",
                },
                onSort: {
                  displayName: "Sort applied",
                },
                onCellValueChanged: {
                  displayName: "Cell value changed",
                },
                onFilterChanged: {
                  displayName: "Filter changed",
                },
              },
              styles: {
                textColor: {
                  type: "color",
                  displayName: "Text Color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                actionButtonRadius: {
                  type: "code",
                  displayName: "Action Button Radius",
                  validation: {
                    schema: {
                      type: "union",
                      schemas: [
                        {
                          type: "string",
                        },
                        {
                          type: "boolean",
                        },
                      ],
                    },
                  },
                },
                tableType: {
                  type: "select",
                  displayName: "Table type",
                  options: [
                    {
                      name: "Bordered",
                      value: "table-bordered",
                    },
                    {
                      name: "Borderless",
                      value: "table-borderless",
                    },
                    {
                      name: "Classic",
                      value: "table-classic",
                    },
                    {
                      name: "Striped",
                      value: "table-striped",
                    },
                    {
                      name: "Striped & bordered",
                      value: "table-striped table-bordered",
                    },
                  ],
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                cellSize: {
                  type: "select",
                  displayName: "Cell size",
                  options: [
                    {
                      name: "Compact",
                      value: "compact",
                    },
                    {
                      name: "Spacious",
                      value: "spacious",
                    },
                  ],
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                borderRadius: {
                  type: "code",
                  displayName: "Border Radius",
                  validation: {
                    schema: {
                      type: "union",
                      schemas: [
                        {
                          type: "string",
                        },
                        {
                          type: "number",
                        },
                      ],
                    },
                  },
                },
                visibility: {
                  type: "toggle",
                  displayName: "Visibility",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                disabledState: {
                  type: "toggle",
                  displayName: "Disable",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
              },
              validate: true,
              generalStyles: {
                boxShadow: {
                  type: "boxShadow",
                  displayName: "Box Shadow",
                },
              },
              definition: {
                others: {
                  showOnDesktop: {
                    value: "{{true}}",
                  },
                  showOnMobile: {
                    value: "{{false}}",
                  },
                },
                events: [],
                styles: {
                  textColor: {
                    value: "#000",
                  },
                  actionButtonRadius: {
                    value: "0",
                  },
                  visibility: {
                    value: "{{true}}",
                  },
                  disabledState: {
                    value: "{{false}}",
                  },
                  cellSize: {
                    value: "compact",
                  },
                  borderRadius: {
                    value: "0",
                  },
                  tableType: {
                    value: "table-bordered",
                  },
                },
                generalStyles: {
                  boxShadow: {
                    value: "0px 0px 0px 0px #00000040",
                  },
                },
                properties: {
                  title: {
                    value: "Table",
                  },
                  visible: {
                    value: "{{true}}",
                  },
                  loadingState: {
                    value: "{{false}}",
                  },
                  data: {
                    value:
                      "{{ [ \n\t\t{ id: 1, name: 'ddd', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}",
                  },
                  rowsPerPage: {
                    value: "{{10}}",
                  },
                  serverSidePagination: {
                    value: "{{false}}",
                  },
                  enableNextButton: {
                    value: "{{true}}",
                  },
                  enablePrevButton: {
                    value: "{{true}}",
                  },
                  totalRecords: {
                    value: "",
                  },
                  clientSidePagination: {
                    value: "{{true}}",
                  },
                  serverSideSort: {
                    value: "{{false}}",
                  },
                  serverSideFilter: {
                    value: "{{false}}",
                  },
                  displaySearchBox: {
                    value: "{{true}}",
                  },
                  showDownloadButton: {
                    value: "{{true}}",
                  },
                  showFilterButton: {
                    value: "{{true}}",
                  },
                  autogenerateColumns: {
                    value: true,
                  },
                  columns: {
                    value: [
                      {
                        name: "id",
                        id: "e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737",
                        autogenerated: true,
                      },
                      {
                        name: "name",
                        id: "5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a",
                        autogenerated: true,
                      },
                      {
                        name: "email",
                        id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f",
                        autogenerated: true,
                      },
                    ],
                  },
                  showBulkUpdateActions: {
                    value: "{{true}}",
                  },
                  showBulkSelector: {
                    value: "{{false}}",
                  },
                  highlightSelectedRow: {
                    value: "{{false}}",
                  },
                  columnSizes: {
                    value: "{{({})}}",
                  },
                  actions: {
                    value: [],
                  },
                  enabledSort: {
                    value: "{{true}}",
                  },
                  hideColumnSelectorButton: {
                    value: "{{false}}",
                  },
                },
                general: {},
                exposedVariables: {},
              },
              name: "table1",
              displayName: "Table",
              description: "Display paginated tabular data",
              component: "Table",
              defaultSize: {
                width: 20,
                height: 300,
              },
              exposedVariables: {
                selectedRow: {},
                changeSet: {},
                dataUpdates: [],
                pageIndex: 1,
                searchText: "",
                selectedRows: [],
                filters: [],
              },
              actions: [
                {
                  handle: "setPage",
                  displayName: "Set page",
                  params: [
                    {
                      handle: "page",
                      displayName: "Page",
                      defaultValue: "{{1}}",
                    },
                  ],
                },
                {
                  handle: "selectRow",
                  displayName: "Select row",
                  params: [
                    {
                      handle: "key",
                      displayName: "Key",
                    },
                    {
                      handle: "value",
                      displayName: "Value",
                    },
                  ],
                },
                {
                  handle: "deselectRow",
                  displayName: "Deselect row",
                },
                {
                  handle: "discardChanges",
                  displayName: "Discard Changes",
                },
              ],
            },
            layouts: {
              desktop: {
                top: 0,
                left: 0,
                width: 20,
                height: 300,
              },
            },
            withDefaultChildren: false,
          },
          "89fdd1eb-ddc8-48ad-b146-b388e2e215a7": {
            component: {
              properties: {
                text: {
                  type: "code",
                  displayName: "Button Text",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                loadingState: {
                  type: "toggle",
                  displayName: "Loading State",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
              },
              general: {
                tooltip: {
                  type: "code",
                  displayName: "Tooltip",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              others: {
                showOnDesktop: {
                  type: "toggle",
                  displayName: "Show on desktop",
                },
                showOnMobile: {
                  type: "toggle",
                  displayName: "Show on mobile",
                },
              },
              events: {
                onClick: {
                  displayName: "On click",
                },
                onHover: {
                  displayName: "On hover",
                },
              },
              styles: {
                backgroundColor: {
                  type: "color",
                  displayName: "Background color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                    defaultValue: false,
                  },
                },
                textColor: {
                  type: "color",
                  displayName: "Text color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                    defaultValue: false,
                  },
                },
                loaderColor: {
                  type: "color",
                  displayName: "Loader color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                    defaultValue: false,
                  },
                },
                visibility: {
                  type: "toggle",
                  displayName: "Visibility",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                    defaultValue: false,
                  },
                },
                disabledState: {
                  type: "toggle",
                  displayName: "Disable",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                    defaultValue: false,
                  },
                },
                borderRadius: {
                  type: "number",
                  displayName: "Border radius",
                  validation: {
                    schema: {
                      type: "number",
                    },
                    defaultValue: false,
                  },
                },
                borderColor: {
                  type: "color",
                  displayName: "Border color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                    defaultValue: false,
                  },
                },
              },
              validate: true,
              generalStyles: {
                boxShadow: {
                  type: "boxShadow",
                  displayName: "Box Shadow",
                },
              },
              definition: {
                others: {
                  showOnDesktop: {
                    value: "{{true}}",
                  },
                  showOnMobile: {
                    value: "{{false}}",
                  },
                },
                events: [],
                styles: {
                  backgroundColor: {
                    value: "#375FCF",
                  },
                  textColor: {
                    value: "#fff",
                  },
                  loaderColor: {
                    value: "#fff",
                  },
                  visibility: {
                    value: "{{true}}",
                  },
                  borderRadius: {
                    value: "{{0}}",
                  },
                  borderColor: {
                    value: "#375FCF",
                  },
                  disabledState: {
                    value: "{{false}}",
                  },
                },
                generalStyles: {
                  boxShadow: {
                    value: "0px 0px 0px 0px #00000040",
                  },
                },
                properties: {
                  text: {
                    value: "Button",
                  },
                  loadingState: {
                    value: "{{false}}",
                  },
                },
                general: {},
                exposedVariables: {},
              },
              name: "button1",
              displayName: "Button",
              description: "Trigger actions: queries, alerts etc",
              component: "Button",
              defaultSize: {
                width: 3,
                height: 30,
              },
              exposedVariables: {},
              actions: [
                {
                  handle: "click",
                  displayName: "Click",
                },
                {
                  handle: "setText",
                  displayName: "Set Text",
                  params: [
                    {
                      handle: "text",
                      displayName: "Text",
                      defaultValue: "New Text",
                    },
                  ],
                },
                {
                  handle: "disable",
                  displayName: "Disable",
                  params: [
                    {
                      handle: "disable",
                      displayName: "Value",
                      defaultValue: "{{false}}",
                      type: "toggle",
                    },
                  ],
                },
                {
                  handle: "visibility",
                  displayName: "Visibility",
                  params: [
                    {
                      handle: "visible",
                      displayName: "Value",
                      defaultValue: "{{false}}",
                      type: "toggle",
                    },
                  ],
                },
                {
                  handle: "loading",
                  displayName: "Loading",
                  params: [
                    {
                      handle: "loading",
                      displayName: "Value",
                      defaultValue: "{{false}}",
                      type: "toggle",
                    },
                  ],
                },
              ],
            },
            layouts: {
              desktop: {
                top: 0,
                left: 79.05525846702318,
                width: 9,
                height: 160,
              },
            },
            withDefaultChildren: false,
          },
          "c80d6f02-1bf0-4df8-a20c-5d9644842984": {
            component: {
              properties: {
                text: {
                  type: "code",
                  displayName: "Text",
                  validation: {
                    schema: {
                      type: "union",
                      schemas: [
                        {
                          type: "string",
                        },
                        {
                          type: "number",
                        },
                      ],
                    },
                  },
                },
                loadingState: {
                  type: "toggle",
                  displayName: "Show loading state",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
              },
              general: {
                tooltip: {
                  type: "code",
                  displayName: "Tooltip",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              others: {
                showOnDesktop: {
                  type: "toggle",
                  displayName: "Show on desktop",
                },
                showOnMobile: {
                  type: "toggle",
                  displayName: "Show on mobile",
                },
              },
              events: {},
              styles: {
                fontWeight: {
                  type: "select",
                  displayName: "Font Weight",
                  options: [
                    {
                      name: "normal",
                      value: "normal",
                    },
                    {
                      name: "bold",
                      value: "bold",
                    },
                    {
                      name: "lighter",
                      value: "lighter",
                    },
                    {
                      name: "bolder",
                      value: "bolder",
                    },
                  ],
                },
                decoration: {
                  type: "select",
                  displayName: "Text Decoration",
                  options: [
                    {
                      name: "none",
                      value: "none",
                    },
                    {
                      name: "overline",
                      value: "overline",
                    },
                    {
                      name: "line-through",
                      value: "line-through",
                    },
                    {
                      name: "underline",
                      value: "underline",
                    },
                    {
                      name: "overline underline",
                      value: "overline underline",
                    },
                  ],
                },
                transformation: {
                  type: "select",
                  displayName: "Text Transformation",
                  options: [
                    {
                      name: "none",
                      value: "none",
                    },
                    {
                      name: "uppercase",
                      value: "uppercase",
                    },
                    {
                      name: "lowercase",
                      value: "lowercase",
                    },
                    {
                      name: "capitalize",
                      value: "capitalize",
                    },
                  ],
                },
                fontStyle: {
                  type: "select",
                  displayName: "Font Style",
                  options: [
                    {
                      name: "normal",
                      value: "normal",
                    },
                    {
                      name: "italic",
                      value: "italic",
                    },
                    {
                      name: "oblique",
                      value: "oblique",
                    },
                  ],
                },
                lineHeight: {
                  type: "number",
                  displayName: "Line Height",
                },
                textIndent: {
                  type: "number",
                  displayName: "Text Indent",
                },
                letterSpacing: {
                  type: "number",
                  displayName: "Letter Spacing",
                },
                wordSpacing: {
                  type: "number",
                  displayName: "Word Spacing",
                },
                fontVariant: {
                  type: "select",
                  displayName: "Font Variant",
                  options: [
                    {
                      name: "normal",
                      value: "normal",
                    },
                    {
                      name: "small-caps",
                      value: "small-caps",
                    },
                    {
                      name: "initial",
                      value: "initial",
                    },
                    {
                      name: "inherit",
                      value: "inherit",
                    },
                  ],
                },
                textSize: {
                  type: "number",
                  displayName: "Text Size",
                  validation: {
                    schema: {
                      type: "number",
                    },
                  },
                },
                backgroundColor: {
                  type: "color",
                  displayName: "Background Color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                textColor: {
                  type: "color",
                  displayName: "Text Color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                textAlign: {
                  type: "alignButtons",
                  displayName: "Align Text",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                visibility: {
                  type: "toggle",
                  displayName: "Visibility",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                disabledState: {
                  type: "toggle",
                  displayName: "Disable",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
              },
              validate: true,
              generalStyles: {
                boxShadow: {
                  type: "boxShadow",
                  displayName: "Box Shadow",
                },
              },
              definition: {
                others: {
                  showOnDesktop: {
                    value: "{{true}}",
                  },
                  showOnMobile: {
                    value: "{{false}}",
                  },
                },
                events: [],
                styles: {
                  backgroundColor: {
                    value: "",
                  },
                  textColor: {
                    value: "#000000",
                  },
                  textSize: {
                    value: "{{33}}",
                  },
                  textAlign: {
                    value: "left",
                  },
                  fontWeight: {
                    value: "normal",
                  },
                  decoration: {
                    value: "none",
                  },
                  transformation: {
                    value: "none",
                  },
                  fontStyle: {
                    value: "normal",
                  },
                  lineHeight: {
                    value: 1.5,
                  },
                  textIndent: {
                    value: 0,
                  },
                  letterSpacing: {
                    value: 0,
                  },
                  wordSpacing: {
                    value: 0,
                  },
                  fontVariant: {
                    value: "normal",
                  },
                  visibility: {
                    value: "{{true}}",
                  },
                  disabledState: {
                    value: "{{false}}",
                  },
                },
                generalStyles: {
                  boxShadow: {
                    value: "0px 0px 0px 0px #00000040",
                  },
                },
                properties: {
                  text: {
                    value: "Hello, there!",
                  },
                  loadingState: {
                    value: "{{false}}",
                  },
                },
                general: {},
                exposedVariables: {},
              },
              name: "text1",
              displayName: "Text",
              description: "Display markdown or HTML",
              component: "Text",
              defaultSize: {
                width: 6,
                height: 30,
              },
              exposedVariables: {
                text: "Hello, there!",
              },
              actions: [
                {
                  handle: "setText",
                  displayName: "Set Text",
                  params: [
                    {
                      handle: "text",
                      displayName: "Text",
                      defaultValue: "New text",
                    },
                  ],
                },
                {
                  handle: "visibility",
                  displayName: "Set Visibility",
                  params: [
                    {
                      handle: "visibility",
                      displayName: "Value",
                      defaultValue: "{{false}}",
                      type: "toggle",
                    },
                  ],
                },
              ],
            },
            layouts: {
              desktop: {
                top: 2170,
                left: -0.043526987765987075,
                width: 16,
                height: 150,
              },
            },
            withDefaultChildren: false,
          },
        },
        handle: "home",
        name: "Home",
      },
    },
    globalSettings: {
      hideHeader: false,
      appInMaintenance: false,
      canvasMaxWidth: 1292,
      canvasMaxWidthType: "px",
      canvasMaxHeight: 2400,
      canvasBackgroundColor: "#edeff5",
      backgroundFxQuery: "",
    },
  },
  appId: "0d785af0-c4de-4a66-a390-dfd23146f919",
  createdAt: "2023-03-23T11:44:40.102Z",
  updatedAt: "2023-03-23T13:31:43.726Z",
  app: {
    id: "0d785af0-c4de-4a66-a390-dfd23146f919",
    name: "Untitled app",
    slug: "0d785af0-c4de-4a66-a390-dfd23146f919",
    isPublic: false,
    isMaintenanceOn: false,
    icon: "business",
    organizationId: "c13faa70-4503-46d1-b0d6-2850386ab7fc",
    currentVersionId: "55f333a4-9dd6-473e-a6cd-dd6493c13908",
    userId: "1383fe7f-3596-48e2-9697-29102291f3fd",
    createdAt: "2023-03-20T12:43:35.375Z",
    updatedAt: "2023-03-23T10:43:27.192Z",
    editingVersion: {
      id: "42af8904-10f3-43e9-a76d-984feb4a8cc4",
      name: "2",
      definition: {
        showViewerNavigation: true,
        homePageId: "3f4387dd-09d1-4742-8ff8-741874c5f039",
        pages: {
          "3f4387dd-09d1-4742-8ff8-741874c5f039": {
            components: {
              "151b2ae8-5fb3-4d2b-b597-cae01de26ca4": {
                component: {
                  properties: {
                    title: {
                      type: "string",
                      displayName: "Title",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    data: {
                      type: "code",
                      displayName: "Table data",
                      validation: {
                        schema: {
                          type: "array",
                          element: {
                            type: "object",
                          },
                          optional: true,
                        },
                      },
                    },
                    loadingState: {
                      type: "toggle",
                      displayName: "Loading state",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    columns: {
                      type: "array",
                      displayName: "Table Columns",
                    },
                    rowsPerPage: {
                      type: "code",
                      displayName: "Number of rows per page",
                      validation: {
                        schema: {
                          type: "union",
                          schemas: [
                            {
                              type: "string",
                            },
                            {
                              type: "number",
                            },
                          ],
                        },
                      },
                    },
                    serverSidePagination: {
                      type: "toggle",
                      displayName: "Server-side pagination",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    enableNextButton: {
                      type: "toggle",
                      displayName: "Enable next page button",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    enabledSort: {
                      type: "toggle",
                      displayName: "Enable sorting",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    hideColumnSelectorButton: {
                      type: "toggle",
                      displayName: "Hide column selector button",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    enablePrevButton: {
                      type: "toggle",
                      displayName: "Enable previous page button",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    totalRecords: {
                      type: "code",
                      displayName: "Total records server side",
                      validation: {
                        schema: {
                          type: "union",
                          schemas: [
                            {
                              type: "string",
                            },
                            {
                              type: "number",
                            },
                          ],
                        },
                      },
                    },
                    clientSidePagination: {
                      type: "toggle",
                      displayName: "Client-side pagination",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    serverSideSearch: {
                      type: "toggle",
                      displayName: "Server-side search",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    serverSideSort: {
                      type: "toggle",
                      displayName: "Server-side sort",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    serverSideFilter: {
                      type: "toggle",
                      displayName: "Server-side filter",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    actionButtonBackgroundColor: {
                      type: "color",
                      displayName: "Background color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    actionButtonTextColor: {
                      type: "color",
                      displayName: "Text color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    displaySearchBox: {
                      type: "toggle",
                      displayName: "Show search box",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    showDownloadButton: {
                      type: "toggle",
                      displayName: "Show download button",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    showFilterButton: {
                      type: "toggle",
                      displayName: "Show filter button",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    showBulkUpdateActions: {
                      type: "toggle",
                      displayName: "Show update buttons",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    showBulkSelector: {
                      type: "toggle",
                      displayName: "Bulk selection",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    highlightSelectedRow: {
                      type: "toggle",
                      displayName: "Highlight selected row",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  general: {
                    tooltip: {
                      type: "code",
                      displayName: "Tooltip",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                  },
                  others: {
                    showOnDesktop: {
                      type: "toggle",
                      displayName: "Show on desktop ",
                    },
                    showOnMobile: {
                      type: "toggle",
                      displayName: "Show on mobile",
                    },
                  },
                  events: {
                    onRowHovered: {
                      displayName: "Row hovered",
                    },
                    onRowClicked: {
                      displayName: "Row clicked",
                    },
                    onBulkUpdate: {
                      displayName: "Save changes",
                    },
                    onPageChanged: {
                      displayName: "Page changed",
                    },
                    onSearch: {
                      displayName: "Search",
                    },
                    onCancelChanges: {
                      displayName: "Cancel changes",
                    },
                    onSort: {
                      displayName: "Sort applied",
                    },
                    onCellValueChanged: {
                      displayName: "Cell value changed",
                    },
                    onFilterChanged: {
                      displayName: "Filter changed",
                    },
                  },
                  styles: {
                    textColor: {
                      type: "color",
                      displayName: "Text Color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    actionButtonRadius: {
                      type: "code",
                      displayName: "Action Button Radius",
                      validation: {
                        schema: {
                          type: "union",
                          schemas: [
                            {
                              type: "string",
                            },
                            {
                              type: "boolean",
                            },
                          ],
                        },
                      },
                    },
                    tableType: {
                      type: "select",
                      displayName: "Table type",
                      options: [
                        {
                          name: "Bordered",
                          value: "table-bordered",
                        },
                        {
                          name: "Borderless",
                          value: "table-borderless",
                        },
                        {
                          name: "Classic",
                          value: "table-classic",
                        },
                        {
                          name: "Striped",
                          value: "table-striped",
                        },
                        {
                          name: "Striped & bordered",
                          value: "table-striped table-bordered",
                        },
                      ],
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    cellSize: {
                      type: "select",
                      displayName: "Cell size",
                      options: [
                        {
                          name: "Compact",
                          value: "compact",
                        },
                        {
                          name: "Spacious",
                          value: "spacious",
                        },
                      ],
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    borderRadius: {
                      type: "code",
                      displayName: "Border Radius",
                      validation: {
                        schema: {
                          type: "union",
                          schemas: [
                            {
                              type: "string",
                            },
                            {
                              type: "number",
                            },
                          ],
                        },
                      },
                    },
                    visibility: {
                      type: "toggle",
                      displayName: "Visibility",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    disabledState: {
                      type: "toggle",
                      displayName: "Disable",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  validate: true,
                  generalStyles: {
                    boxShadow: {
                      type: "boxShadow",
                      displayName: "Box Shadow",
                    },
                  },
                  definition: {
                    others: {
                      showOnDesktop: {
                        value: "{{true}}",
                      },
                      showOnMobile: {
                        value: "{{false}}",
                      },
                    },
                    events: [],
                    styles: {
                      textColor: {
                        value: "#000",
                      },
                      actionButtonRadius: {
                        value: "0",
                      },
                      visibility: {
                        value: "{{true}}",
                      },
                      disabledState: {
                        value: "{{false}}",
                      },
                      cellSize: {
                        value: "compact",
                      },
                      borderRadius: {
                        value: "0",
                      },
                      tableType: {
                        value: "table-bordered",
                      },
                    },
                    generalStyles: {
                      boxShadow: {
                        value: "0px 0px 0px 0px #00000040",
                      },
                    },
                    properties: {
                      title: {
                        value: "Table",
                      },
                      visible: {
                        value: "{{true}}",
                      },
                      loadingState: {
                        value: "{{false}}",
                      },
                      data: {
                        value:
                          "{{ [ \n\t\t{ id: 1, name: 'ddd', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}",
                      },
                      rowsPerPage: {
                        value: "{{10}}",
                      },
                      serverSidePagination: {
                        value: "{{false}}",
                      },
                      enableNextButton: {
                        value: "{{true}}",
                      },
                      enablePrevButton: {
                        value: "{{true}}",
                      },
                      totalRecords: {
                        value: "",
                      },
                      clientSidePagination: {
                        value: "{{true}}",
                      },
                      serverSideSort: {
                        value: "{{false}}",
                      },
                      serverSideFilter: {
                        value: "{{false}}",
                      },
                      displaySearchBox: {
                        value: "{{true}}",
                      },
                      showDownloadButton: {
                        value: "{{true}}",
                      },
                      showFilterButton: {
                        value: "{{true}}",
                      },
                      autogenerateColumns: {
                        value: true,
                      },
                      columns: {
                        value: [
                          {
                            name: "id",
                            id: "e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737",
                            autogenerated: true,
                          },
                          {
                            name: "name",
                            id: "5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a",
                            autogenerated: true,
                          },
                          {
                            name: "email",
                            id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f",
                            autogenerated: true,
                          },
                        ],
                      },
                      showBulkUpdateActions: {
                        value: "{{true}}",
                      },
                      showBulkSelector: {
                        value: "{{false}}",
                      },
                      highlightSelectedRow: {
                        value: "{{false}}",
                      },
                      columnSizes: {
                        value: "{{({})}}",
                      },
                      actions: {
                        value: [],
                      },
                      enabledSort: {
                        value: "{{true}}",
                      },
                      hideColumnSelectorButton: {
                        value: "{{false}}",
                      },
                    },
                    general: {},
                    exposedVariables: {},
                  },
                  name: "table1",
                  displayName: "Table",
                  description: "Display paginated tabular data",
                  component: "Table",
                  defaultSize: {
                    width: 20,
                    height: 300,
                  },
                  exposedVariables: {
                    selectedRow: {},
                    changeSet: {},
                    dataUpdates: [],
                    pageIndex: 1,
                    searchText: "",
                    selectedRows: [],
                    filters: [],
                  },
                  actions: [
                    {
                      handle: "setPage",
                      displayName: "Set page",
                      params: [
                        {
                          handle: "page",
                          displayName: "Page",
                          defaultValue: "{{1}}",
                        },
                      ],
                    },
                    {
                      handle: "selectRow",
                      displayName: "Select row",
                      params: [
                        {
                          handle: "key",
                          displayName: "Key",
                        },
                        {
                          handle: "value",
                          displayName: "Value",
                        },
                      ],
                    },
                    {
                      handle: "deselectRow",
                      displayName: "Deselect row",
                    },
                    {
                      handle: "discardChanges",
                      displayName: "Discard Changes",
                    },
                  ],
                },
                layouts: {
                  desktop: {
                    top: 0,
                    left: 0,
                    width: 20,
                    height: 300,
                  },
                },
                withDefaultChildren: false,
              },
              "89fdd1eb-ddc8-48ad-b146-b388e2e215a7": {
                component: {
                  properties: {
                    text: {
                      type: "code",
                      displayName: "Button Text",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    loadingState: {
                      type: "toggle",
                      displayName: "Loading State",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  general: {
                    tooltip: {
                      type: "code",
                      displayName: "Tooltip",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                  },
                  others: {
                    showOnDesktop: {
                      type: "toggle",
                      displayName: "Show on desktop",
                    },
                    showOnMobile: {
                      type: "toggle",
                      displayName: "Show on mobile",
                    },
                  },
                  events: {
                    onClick: {
                      displayName: "On click",
                    },
                    onHover: {
                      displayName: "On hover",
                    },
                  },
                  styles: {
                    backgroundColor: {
                      type: "color",
                      displayName: "Background color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                        defaultValue: false,
                      },
                    },
                    textColor: {
                      type: "color",
                      displayName: "Text color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                        defaultValue: false,
                      },
                    },
                    loaderColor: {
                      type: "color",
                      displayName: "Loader color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                        defaultValue: false,
                      },
                    },
                    visibility: {
                      type: "toggle",
                      displayName: "Visibility",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                        defaultValue: false,
                      },
                    },
                    disabledState: {
                      type: "toggle",
                      displayName: "Disable",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                        defaultValue: false,
                      },
                    },
                    borderRadius: {
                      type: "number",
                      displayName: "Border radius",
                      validation: {
                        schema: {
                          type: "number",
                        },
                        defaultValue: false,
                      },
                    },
                    borderColor: {
                      type: "color",
                      displayName: "Border color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                        defaultValue: false,
                      },
                    },
                  },
                  validate: true,
                  generalStyles: {
                    boxShadow: {
                      type: "boxShadow",
                      displayName: "Box Shadow",
                    },
                  },
                  definition: {
                    others: {
                      showOnDesktop: {
                        value: "{{true}}",
                      },
                      showOnMobile: {
                        value: "{{false}}",
                      },
                    },
                    events: [],
                    styles: {
                      backgroundColor: {
                        value: "#375FCF",
                      },
                      textColor: {
                        value: "#fff",
                      },
                      loaderColor: {
                        value: "#fff",
                      },
                      visibility: {
                        value: "{{true}}",
                      },
                      borderRadius: {
                        value: "{{0}}",
                      },
                      borderColor: {
                        value: "#375FCF",
                      },
                      disabledState: {
                        value: "{{false}}",
                      },
                    },
                    generalStyles: {
                      boxShadow: {
                        value: "0px 0px 0px 0px #00000040",
                      },
                    },
                    properties: {
                      text: {
                        value: "Button",
                      },
                      loadingState: {
                        value: "{{false}}",
                      },
                    },
                    general: {},
                    exposedVariables: {},
                  },
                  name: "button1",
                  displayName: "Button",
                  description: "Trigger actions: queries, alerts etc",
                  component: "Button",
                  defaultSize: {
                    width: 3,
                    height: 30,
                  },
                  exposedVariables: {},
                  actions: [
                    {
                      handle: "click",
                      displayName: "Click",
                    },
                    {
                      handle: "setText",
                      displayName: "Set Text",
                      params: [
                        {
                          handle: "text",
                          displayName: "Text",
                          defaultValue: "New Text",
                        },
                      ],
                    },
                    {
                      handle: "disable",
                      displayName: "Disable",
                      params: [
                        {
                          handle: "disable",
                          displayName: "Value",
                          defaultValue: "{{false}}",
                          type: "toggle",
                        },
                      ],
                    },
                    {
                      handle: "visibility",
                      displayName: "Visibility",
                      params: [
                        {
                          handle: "visible",
                          displayName: "Value",
                          defaultValue: "{{false}}",
                          type: "toggle",
                        },
                      ],
                    },
                    {
                      handle: "loading",
                      displayName: "Loading",
                      params: [
                        {
                          handle: "loading",
                          displayName: "Value",
                          defaultValue: "{{false}}",
                          type: "toggle",
                        },
                      ],
                    },
                  ],
                },
                layouts: {
                  desktop: {
                    top: 0,
                    left: 79.05525846702318,
                    width: 9,
                    height: 160,
                  },
                },
                withDefaultChildren: false,
              },
              "c80d6f02-1bf0-4df8-a20c-5d9644842984": {
                component: {
                  properties: {
                    text: {
                      type: "code",
                      displayName: "Text",
                      validation: {
                        schema: {
                          type: "union",
                          schemas: [
                            {
                              type: "string",
                            },
                            {
                              type: "number",
                            },
                          ],
                        },
                      },
                    },
                    loadingState: {
                      type: "toggle",
                      displayName: "Show loading state",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  general: {
                    tooltip: {
                      type: "code",
                      displayName: "Tooltip",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                  },
                  others: {
                    showOnDesktop: {
                      type: "toggle",
                      displayName: "Show on desktop",
                    },
                    showOnMobile: {
                      type: "toggle",
                      displayName: "Show on mobile",
                    },
                  },
                  events: {},
                  styles: {
                    fontWeight: {
                      type: "select",
                      displayName: "Font Weight",
                      options: [
                        {
                          name: "normal",
                          value: "normal",
                        },
                        {
                          name: "bold",
                          value: "bold",
                        },
                        {
                          name: "lighter",
                          value: "lighter",
                        },
                        {
                          name: "bolder",
                          value: "bolder",
                        },
                      ],
                    },
                    decoration: {
                      type: "select",
                      displayName: "Text Decoration",
                      options: [
                        {
                          name: "none",
                          value: "none",
                        },
                        {
                          name: "overline",
                          value: "overline",
                        },
                        {
                          name: "line-through",
                          value: "line-through",
                        },
                        {
                          name: "underline",
                          value: "underline",
                        },
                        {
                          name: "overline underline",
                          value: "overline underline",
                        },
                      ],
                    },
                    transformation: {
                      type: "select",
                      displayName: "Text Transformation",
                      options: [
                        {
                          name: "none",
                          value: "none",
                        },
                        {
                          name: "uppercase",
                          value: "uppercase",
                        },
                        {
                          name: "lowercase",
                          value: "lowercase",
                        },
                        {
                          name: "capitalize",
                          value: "capitalize",
                        },
                      ],
                    },
                    fontStyle: {
                      type: "select",
                      displayName: "Font Style",
                      options: [
                        {
                          name: "normal",
                          value: "normal",
                        },
                        {
                          name: "italic",
                          value: "italic",
                        },
                        {
                          name: "oblique",
                          value: "oblique",
                        },
                      ],
                    },
                    lineHeight: {
                      type: "number",
                      displayName: "Line Height",
                    },
                    textIndent: {
                      type: "number",
                      displayName: "Text Indent",
                    },
                    letterSpacing: {
                      type: "number",
                      displayName: "Letter Spacing",
                    },
                    wordSpacing: {
                      type: "number",
                      displayName: "Word Spacing",
                    },
                    fontVariant: {
                      type: "select",
                      displayName: "Font Variant",
                      options: [
                        {
                          name: "normal",
                          value: "normal",
                        },
                        {
                          name: "small-caps",
                          value: "small-caps",
                        },
                        {
                          name: "initial",
                          value: "initial",
                        },
                        {
                          name: "inherit",
                          value: "inherit",
                        },
                      ],
                    },
                    textSize: {
                      type: "number",
                      displayName: "Text Size",
                      validation: {
                        schema: {
                          type: "number",
                        },
                      },
                    },
                    backgroundColor: {
                      type: "color",
                      displayName: "Background Color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    textColor: {
                      type: "color",
                      displayName: "Text Color",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    textAlign: {
                      type: "alignButtons",
                      displayName: "Align Text",
                      validation: {
                        schema: {
                          type: "string",
                        },
                      },
                    },
                    visibility: {
                      type: "toggle",
                      displayName: "Visibility",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                    disabledState: {
                      type: "toggle",
                      displayName: "Disable",
                      validation: {
                        schema: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  validate: true,
                  generalStyles: {
                    boxShadow: {
                      type: "boxShadow",
                      displayName: "Box Shadow",
                    },
                  },
                  definition: {
                    others: {
                      showOnDesktop: {
                        value: "{{true}}",
                      },
                      showOnMobile: {
                        value: "{{false}}",
                      },
                    },
                    events: [],
                    styles: {
                      backgroundColor: {
                        value: "",
                      },
                      textColor: {
                        value: "#000000",
                      },
                      textSize: {
                        value: "{{33}}",
                      },
                      textAlign: {
                        value: "left",
                      },
                      fontWeight: {
                        value: "normal",
                      },
                      decoration: {
                        value: "none",
                      },
                      transformation: {
                        value: "none",
                      },
                      fontStyle: {
                        value: "normal",
                      },
                      lineHeight: {
                        value: 1.5,
                      },
                      textIndent: {
                        value: 0,
                      },
                      letterSpacing: {
                        value: 0,
                      },
                      wordSpacing: {
                        value: 0,
                      },
                      fontVariant: {
                        value: "normal",
                      },
                      visibility: {
                        value: "{{true}}",
                      },
                      disabledState: {
                        value: "{{false}}",
                      },
                    },
                    generalStyles: {
                      boxShadow: {
                        value: "0px 0px 0px 0px #00000040",
                      },
                    },
                    properties: {
                      text: {
                        value: "Hello, there!",
                      },
                      loadingState: {
                        value: "{{false}}",
                      },
                    },
                    general: {},
                    exposedVariables: {},
                  },
                  name: "text1",
                  displayName: "Text",
                  description: "Display markdown or HTML",
                  component: "Text",
                  defaultSize: {
                    width: 6,
                    height: 30,
                  },
                  exposedVariables: {
                    text: "Hello, there!",
                  },
                  actions: [
                    {
                      handle: "setText",
                      displayName: "Set Text",
                      params: [
                        {
                          handle: "text",
                          displayName: "Text",
                          defaultValue: "New text",
                        },
                      ],
                    },
                    {
                      handle: "visibility",
                      displayName: "Set Visibility",
                      params: [
                        {
                          handle: "visibility",
                          displayName: "Value",
                          defaultValue: "{{false}}",
                          type: "toggle",
                        },
                      ],
                    },
                  ],
                },
                layouts: {
                  desktop: {
                    top: 2170,
                    left: -0.043526987765987075,
                    width: 16,
                    height: 150,
                  },
                },
                withDefaultChildren: false,
              },
            },
            handle: "home",
            name: "Home",
          },
        },
        globalSettings: {
          hideHeader: false,
          appInMaintenance: false,
          canvasMaxWidth: 1292,
          canvasMaxWidthType: "px",
          canvasMaxHeight: 2400,
          canvasBackgroundColor: "#edeff5",
          backgroundFxQuery: "",
        },
      },
      appId: "0d785af0-c4de-4a66-a390-dfd23146f919",
      createdAt: "2023-03-23T11:44:40.102Z",
      updatedAt: "2023-03-23T13:31:43.726Z",
    },
  },
  dataQueries: [],
  data_queries: [],
};

class ViewerComponent extends React.Component {
  constructor(props) {
    console.log("props in view", props.location.state.mode);
    super(props);
    const deviceWindowWidth = window.screen.width - 5;
    const isMobileDevice = deviceWindowWidth < 600;

    const pageHandle = this.props.match?.params?.pageHandle;

    const slug = this.props.match.params.slug;
    const appId = this.props.match.params.id;
    const versionId = this.props.match.params.versionId;

    this.state = {
      slug,
      appId,
      versionId,
      deviceWindowWidth,
      currentLayout: isMobileDevice ? "mobile" : "desktop",
      isLoading: true,
      users: null,
      appDefinition: { pages: {} },
      currentState: {
        queries: {},
        components: {},
        globals: {
          currentUser: {},
          theme: { name: props.darkMode ? "dark" : "light" },
          urlparams: {},
          environment_variables: {},
          page: {
            handle: pageHandle,
          },
        },
        variables: {},
      },
      queryConfirmationList: [],
      isAppLoaded: false,
      errorAppId: null,
      errorVersionId: null,
      errorDetails: null,
      pages: {},
    };
  }

  setStateForApp = (data) => {
    const copyDefinition = _.cloneDeep(data.definition);
    const pagesObj = copyDefinition?.pages || {};

    const newDefinition = {
      ...copyDefinition,
      pages: pagesObj,
    };

    this.setState({
      app: data,
      isLoading: false,
      isAppLoaded: true,
      appDefinition: newDefinition || { components: {} },
    });
  };

  setStateForContainer = async (data) => {
    let userVars = {};

    let mobileLayoutHasWidgets = false;

    if (this.state.currentLayout === "mobile") {
      const currentComponents =
        data.definition.pages[data.definition.homePageId].components;
      mobileLayoutHasWidgets =
        Object.keys(currentComponents).filter(
          (componentId) => currentComponents[componentId]["layouts"]["mobile"]
        ).length > 0;
    }

    let queryState = {};
    data.data_queries.forEach((query) => {
      if (query.pluginId || query?.plugin?.id) {
        queryState[query.name] = {
          ...query.plugin.manifestFile.data.source.exposedVariables,
          ...this.state.currentState.queries[query.name],
        };
      } else {
        // queryState[query.name] = {
        //   ...DataSourceTypes.find((source) => source.kind === query.kind).exposedVariables,
        //   ...this.state.currentState.queries[query.name],
        // };
      }
    });

    const variables = await this.fetchOrgEnvironmentVariables(
      data.slug,
      data.is_public
    );
    const pages = Object?.entries(data?.definition?.pages).map(
      ([pageId, page]) => ({ id: pageId, ...page })
    );
    const homePageId = data.definition.homePageId;
    const startingPageHandle = this.props.match?.params?.pageHandle;
    const currentPageId =
      pages.filter((page) => page.handle === startingPageHandle)[0]?.id ??
      homePageId;
    const currentPage = pages.find((page) => page.id === currentPageId);

    this.setState(
      {
        currentSidebarTab: 2,
        currentLayout: mobileLayoutHasWidgets ? "mobile" : "desktop",
        canvasWidth:
          this.state.currentLayout === "desktop"
            ? "100%"
            : mobileLayoutHasWidgets
            ? `${this.state.deviceWindowWidth}px`
            : "1292px",
        selectedComponent: null,
        currentState: {
          queries: queryState,
          components: {},
          globals: {
            currentUser: userVars,
            theme: { name: this.props.darkMode ? "dark" : "light" },
            urlparams: JSON.parse(
              JSON.stringify(queryString.parse(this.props.location.search))
            ),
          },
          variables: {},
          page: {
            id: currentPage.id,
            handle: currentPage.handle,
            name: currentPage.name,
            variables: {},
          },
          ...variables,
        },
        dataQueries: data.data_queries,
        currentPageId: currentPage.id,
        pages: {},
      },
      () => {
        computeComponentState(
          this,
          data?.definition?.pages[currentPage.id]?.components
        ).then(async () => {
          this.setState({ initialComputationOfStateDone: true });

          this.runQueries(data.data_queries);
          const { events } =
            this.state.appDefinition?.pages[this.state.currentPageId];
          for (const event of events ?? []) {
            await this.handleEvent(event.eventId, event);
          }
        });
      }
    );
  };

  runQueries = (data_queries) => {
    data_queries.forEach((query) => {
      if (query.options.runOnPageLoad) {
        runQuery(this, query.id, query.name, undefined, "view");
      }
    });
  };

  fetchOrgEnvironmentVariables = async (slug, isPublic) => {
    const variables = {
      client: {},
      server: {},
    };

    let variablesResult;
    // if (!isPublic) {
    //   variablesResult = await orgEnvironmentVariableService.getVariables();
    // } else {
    //   variablesResult = await orgEnvironmentVariableService.getVariablesFromPublicApp(slug);
    // }

    // variablesResult.variables.map((variable) => {
    //   variables[variable.variable_type][variable.variable_name] =
    //     variable.variable_type === 'server' ? 'HiddenEnvironmentVariable' : variable.value;
    // });
    // return variables;
  };

  loadApplicationBySlug = (slug) => {
    // this.setStateForApp(temp);
    // this.setStateForContainer(temp);
  };

  loadApplicationByVersion = (appId, versionId) => {
    // console.log("appdef",JSON.parse(localStorage.getItem('appdef')));

    axios
      .get(
        `https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=${ApiCallParams.id}`
      )
      .then((response) => {
        temp.definition = JSON.parse(
          response?.data?.resultData[0].reportValues
        );

        this.setStateForApp(temp);
        this.setStateForContainer(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  switchOrganization = (orgId, appId, versionId) => {
    const path = `/applications/${appId}${
      versionId ? `/versions/${versionId}` : ""
    }`;
    const sub_path = window?.public_config?.SUB_PATH
      ? stripTrailingSlash(window?.public_config?.SUB_PATH)
      : "";
  };

  // handleError = (errorDetails, appId, versionId) => {
  //   try {
  //     if (errorDetails?.data) {
  //       const statusCode = errorDetails.data?.statusCode;
  //       if (statusCode === 403) {
  //         const errorObj = safelyParseJSON(errorDetails.data?.message);
  //         if (
  //           errorObj?.organizationId &&
  //           this.state.currentUser &&
  //           this.state.currentUser.organization_id !== errorObj?.organizationId
  //         ) {
  //           this.switchOrganization(errorObj?.organizationId, appId, versionId);
  //           return;
  //         }
  //         return <Redirect to={"/"} />;
  //       } else if (statusCode === 401) {
  //         return (
  //           <Redirect
  //             to={`/login?redirectTo=${this.props.location.pathname}`}
  //           />
  //         );
  //       } else if (statusCode === 404) {
  //         toast.error(errorDetails?.error ?? "App not found", {
  //           position: "top-center",
  //         });
  //       }
  //       return <Redirect to={"/"} />;
  //     }
  //   } catch (err) {
  //     return <Redirect to={"/"} />;
  //   }
  // };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const appId = this.props.match.params.id;
    const versionId = this.props.match.params.versionId;

    this.setState({ isLoading: false });
    slug
      ? this.loadApplicationBySlug(slug)
      : this.loadApplicationByVersion(appId, versionId);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.slug &&
      this.props.match.params.slug !== prevProps.match.params.slug
    ) {
      this.setState({ isLoading: true });
      this.loadApplicationBySlug(this.props.match.params.slug);
    }

    if (this.state.initialComputationOfStateDone)
      this.handlePageSwitchingBasedOnURLparam();
  }

  handlePageSwitchingBasedOnURLparam() {
    const handleOnURL = this.props.match.params.pageHandle;
    const pageIdCorrespondingToHandleOnURL = handleOnURL
      ? this.findPageIdFromHandle(handleOnURL)
      : this.state.appDefinition.homePageId;
    const currentPageId = this.state.currentPageId;

    if (pageIdCorrespondingToHandleOnURL != this.state.currentPageId) {
      const targetPage =
        this.state.appDefinition.pages[pageIdCorrespondingToHandleOnURL];
      this.setState(
        {
          pages: {
            ...this.state.pages,
            [currentPageId]: {
              ...this.state.pages?.[currentPageId],
              variables: {
                ...this.state.currentState?.page?.variables,
              },
            },
          },
          currentPageId: pageIdCorrespondingToHandleOnURL,
          handle: targetPage.handle,
          name: targetPage.name,
          currentState: {
            ...this.state.currentState,
            globals: {
              ...this.state.currentState.globals,
              urlparams: JSON.parse(
                JSON.stringify(queryString.parse(this.props.location.search))
              ),
            },
            page: {
              ...this.state.currentState.page,
              name: targetPage.name,
              handle: targetPage.handle,
              variables:
                this.state.pages?.[pageIdCorrespondingToHandleOnURL]
                  ?.variables ?? {},
              id: pageIdCorrespondingToHandleOnURL,
            },
          },
        },
        async () => {
          computeComponentState(
            this,
            this.state.appDefinition?.pages[this.state.currentPageId].components
          ).then(async () => {
            const { events } =
              this.state.appDefinition?.pages[this.state.currentPageId];
            for (const event of events ?? []) {
              await this.handleEvent(event.eventId, event);
            }
          });
        }
      );
    }
  }

  findPageIdFromHandle(handle) {
    return (
      Object.entries(this.state.appDefinition.pages).filter(
        ([_id, page]) => page.handle === handle
      )?.[0]?.[0] ?? this.state.appDefinition.homePageId
    );
  }

  getCanvasWidth = () => {
    const canvasBoundingRect = document
      .getElementsByClassName("canvas-area")[0]
      .getBoundingClientRect();
    return canvasBoundingRect?.width;
  };

  setWindowTitle(name) {
    document.title = name ?? "Untitled App";
  }

  computeCanvasBackgroundColor = () => {
    const bgColor =
      (this.state.appDefinition.globalSettings?.backgroundFxQuery ||
        this.state.appDefinition.globalSettings?.canvasBackgroundColor) ??
      "#edeff5";
    const resolvedBackgroundColor = resolveReferences(
      bgColor,
      this.state.currentState
    );
    if (["#2f3c4c", "#edeff5"].includes(resolvedBackgroundColor)) {
      return this.props.darkMode ? "#2f3c4c" : "#edeff5";
    }

    return resolvedBackgroundColor;
  };

  changeDarkMode = (newMode) => {
    this.setState({
      currentState: {
        ...this.state.currentState,
        globals: {
          ...this.state.currentState.globals,
          theme: { name: newMode ? "dark" : "light" },
        },
      },
      showQuerySearchField: false,
    });
    this.props.switchDarkMode(newMode);
  };

  switchPage = (id, queryParams = []) => {
    if (this.state.currentPageId === id) return;

    const { handle } = this.state.appDefinition.pages[id];

    const queryParamsString = queryParams
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (this.state.slug)
      this.props.history.push(
        `/applications/${this.state.slug}/${handle}?${queryParamsString}`
      );
    else
      this.props.history.push(
        `/applications/${this.state.appId}/versions/${this.state.versionId}/${handle}?${queryParamsString}`
      );
  };

  handleEvent = (eventName, options) =>
    onEvent(this, eventName, options, "view");

  computeCanvasMaxWidth = () => {
    const { appDefinition } = this.state;
    let computedCanvasMaxWidth = 1292;

    if (appDefinition.globalSettings?.canvasMaxWidthType === "px")
      computedCanvasMaxWidth =
        (+appDefinition.globalSettings?.canvasMaxWidth || 1292) -
        (appDefinition?.showViewerNavigation ? 200 : 0);
    else if (appDefinition.globalSettings?.canvasMaxWidthType === "%")
      computedCanvasMaxWidth =
        +appDefinition.globalSettings?.canvasMaxWidth + "%";

    return computedCanvasMaxWidth;
  };

  render() {
    const {
      appDefinition,
      isLoading,
      // isAppLoaded,
      currentLayout,
      defaultComponentStateComputed,
      // queryConfirmationList,
      canvasWidth,
    } = this.state;

    const currentCanvasWidth = canvasWidth;

    const canvasMaxWidth = this.computeCanvasMaxWidth();

    if (this.state.app?.isLoading) {
      return (
        <div className="tooljet-logo-loader">
          <div>
            <div className="loader-logo">
              <ViewerLogoIcon />
            </div>
            <div className="loader-spinner">
              <Spinner />
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.app?.is_maintenance_on) {
        return (
          <div className="maintenance_container">
            <div className="card">
              <div
                className="card-body"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>
                  {this.props.t(
                    "viewer",
                    "Sorry!. This app is under maintenance"
                  )}
                </h3>
              </div>
            </div>
          </div>
        );
      } else {
        // if (errorDetails) {
        //   this.handleError(errorDetails, errorAppId, errorVersionId);
        // }

        return (
          <div className="viewer wrapper">
            {/* <Confirm
              // show={queryConfirmationList.length > 0}
              message={'Do you want to run this query?'}
              onConfirm={(queryConfirmationData) => onQueryConfirmOrCancel(this, queryConfirmationData, true, 'view')}
              // onCancel={() => onQueryConfirmOrCancel(this, queryConfirmationList[0], false, 'view')}
              // queryConfirmationData={queryConfirmationList[0]}
              // key={queryConfirmationList[0]?.queryName}
            /> */}
            <DndProvider backend={HTML5Backend}>
              <ViewerNavigation.Header
                // showHeader={!appDefinition.globalSettings?.hideHeader && isAppLoaded}
                appName={this.state.app?.name ?? null}
                changeDarkMode={this.changeDarkMode}
                darkMode={this.props.darkMode}
                pages={Object.entries(this.state.appDefinition?.pages) ?? []}
                currentPageId={
                  this.state?.currentPageId ??
                  this.state.appDefinition?.homePageId
                }
                switchPage={this.switchPage}
                currentLayout={this.state.currentLayout}
              />
              <div className="sub-section">
                <div className="main">
                  <div
                    className="canvas-container align-items-center"
                    style={{
                      backgroundColor: this.computeCanvasBackgroundColor(),
                      width:
                        this.props.location.state.mode === "preview"
                          ? "100%"
                          : "80%",
                    }}
                  >
                    <div className="areas d-flex flex-rows justify-content-center">
                      <div
                        className="canvas-area"
                        style={{
                          width: "100%",
                          minHeight: "100%",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          backgroundColor: this.computeCanvasBackgroundColor(),
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        {defaultComponentStateComputed && (
                          <>
                            {isLoading ? (
                              <div className="mx-auto mt-5 w-50 p-5">
                                <center>
                                  <div
                                    className="spinner-border text-azure"
                                    role="status"
                                  ></div>
                                </center>
                              </div>
                            ) : (
                              <Container
                                appDefinition={appDefinition}
                                appDefinitionChanged={() => false} // function not relevant in viewer
                                snapToGrid={true}
                                appLoading={isLoading}
                                darkMode={this.props.darkMode}
                                onEvent={(eventName, options) =>
                                  onEvent(this, eventName, options, "view")
                                }
                                mode="view"
                                // deviceWindowWidth={deviceWindowWidth}
                                currentLayout={currentLayout}
                                currentState={this.state.currentState}
                                selectedComponent={this.state.selectedComponent}
                                onComponentClick={(id, component) => {
                                  this.setState({
                                    selectedComponent: { id, component },
                                  });
                                  onComponentClick(this, id, component, "view");
                                }}
                                onComponentOptionChanged={(
                                  component,
                                  optionName,
                                  value
                                ) => {
                                  return onComponentOptionChanged(
                                    this,
                                    component,
                                    optionName,
                                    value
                                  );
                                }}
                                onComponentOptionsChanged={(
                                  component,
                                  options
                                ) =>
                                  onComponentOptionsChanged(
                                    this,
                                    component,
                                    options
                                  )
                                }
                                canvasWidth={this.getCanvasWidth()}
                                // dataQueries={dataQueries}
                                currentPageId={this.state.currentPageId}
                                reportTemplateDataMap={
                                  this.props.location.state
                                }
                                customMode={this.props.location.state.mode}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DndProvider>
          </div>
        );
      }
    }
  }
}

export const Viewer = withTranslation()(ViewerComponent);
