/** @format */

export const widgets = [
  //table
  {
    name: "Table",
    displayName: "Table",
    description: "Display paginated tabular data",
    component: "Table",
    properties: {
      title: {
        type: "string",
        displayName: "Title",
        validation: {
          schema: { type: "string" },
        },
      },
      data: {
        type: "code",
        displayName: "Table data",
        validation: {
          schema: {
            type: "array",
            element: { type: "object" },
            optional: true,
          },
        },
      },
      loadingState: {
        type: "toggle",
        displayName: "Loading state",
        validation: {
          schema: { type: "boolean" },
        },
      },
      columns: {
        type: "array",
        displayName: "Table Columns",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    textWrap: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    textColor: { type: "string" },
                    regex: { type: "string" },
                    minLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    maxLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    customRule: { type: "string" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    activeColor: { type: "string" },
                    isEditable: { type: "boolean" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    dateFormat: { type: "string" },
                    parseDateFormat: { type: "string" },
                    isTimeChecked: { type: "boolean" },
                    isEditable: { type: "boolean" },
                  },
                },
              ],
            },
          },
        },
      },
      rowsPerPage: {
        type: "code",
        displayName: "Number of rows per page",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      serverSidePagination: {
        type: "toggle",
        displayName: "Server-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enableNextButton: {
        type: "toggle",
        displayName: "Enable next page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enabledSort: {
        type: "toggle",
        displayName: "Enable sorting",
        validation: {
          schema: { type: "boolean" },
        },
      },
      hideColumnSelectorButton: {
        type: "toggle",
        displayName: "Hide column selector button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enablePrevButton: {
        type: "toggle",
        displayName: "Enable previous page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      totalRecords: {
        type: "code",
        displayName: "Total records server side",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      clientSidePagination: {
        type: "toggle",
        displayName: "Client-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSearch: {
        type: "toggle",
        displayName: "Server-side search",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSort: {
        type: "toggle",
        displayName: "Server-side sort",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideFilter: {
        type: "toggle",
        displayName: "Server-side filter",
        validation: {
          schema: { type: "boolean" },
        },
      },
      actionButtonBackgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonTextColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
        },
      },
      displaySearchBox: {
        type: "toggle",
        displayName: "Show search box",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showDownloadButton: {
        type: "toggle",
        displayName: "Show download button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showFilterButton: {
        type: "toggle",
        displayName: "Show filter button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkUpdateActions: {
        type: "toggle",
        displayName: "Show update buttons",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkSelector: {
        type: "toggle",
        displayName: "Bulk selection",
        validation: {
          schema: { type: "boolean" },
        },
      },
      highlightSelectedRow: {
        type: "toggle",
        displayName: "Highlight selected row",
        validation: {
          schema: { type: "boolean" },
        },
      },
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop " },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    defaultSize: {
      width: 20,
      height: 300,
    },
    events: {
      onRowHovered: { displayName: "Row hovered" },
      onRowClicked: { displayName: "Row clicked" },
      onBulkUpdate: { displayName: "Save changes" },
      onPageChanged: { displayName: "Page changed" },
      onSearch: { displayName: "Search" },
      onCancelChanges: { displayName: "Cancel changes" },
      onSort: { displayName: "Sort applied" },
      onCellValueChanged: { displayName: "Cell value changed" },
      onFilterChanged: { displayName: "Filter changed" },
    },
    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonRadius: {
        type: "code",
        displayName: "Action Button Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "boolean" }],
          },
        },
      },
      tableType: {
        type: "select",
        displayName: "Table type",
        options: [
          { name: "Bordered", value: "table-bordered" },
          { name: "Borderless", value: "table-borderless" },
          { name: "Classic", value: "table-classic" },
          { name: "Striped", value: "table-striped" },
          { name: "Striped & bordered", value: "table-striped table-bordered" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      cellSize: {
        type: "select",
        displayName: "Cell size",
        options: [
          { name: "Compact", value: "compact" },
          { name: "Spacious", value: "spacious" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      borderRadius: {
        type: "code",
        displayName: "Border Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
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
          { handle: "key", displayName: "Key" },
          { handle: "value", displayName: "Value" },
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
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        title: { value: "Table" },
        visible: { value: "{{true}}" },
        loadingState: { value: "{{false}}" },
        data: {
          value:
            "{{ [ \n\t\t{ id: 1, name: 'Sarah', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}",
        },
        rowsPerPage: { value: "{{10}}" },
        serverSidePagination: { value: "{{false}}" },
        enableNextButton: { value: "{{true}}" },
        enablePrevButton: { value: "{{true}}" },
        totalRecords: { value: "" },
        clientSidePagination: { value: "{{false}}" },
        serverSideSort: { value: "{{false}}" },
        serverSideFilter: { value: "{{false}}" },
        displaySearchBox: { value: "{{true}}" },
        showDownloadButton: { value: "{{true}}" },
        showFilterButton: { value: "{{true}}" },
        autogenerateColumns: { value: true },
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
        showBulkUpdateActions: { value: "{{true}}" },
        showBulkSelector: { value: "{{false}}" },
        highlightSelectedRow: { value: "{{false}}" },
        columnSizes: { value: "{{({})}}" },
        actions: { value: [] },
        enabledSort: { value: "{{false}}" },
        hideColumnSelectorButton: { value: "{{false}}" },
      },
      events: [],
      styles: {
        textColor: { value: "#000" },
        actionButtonRadius: { value: "0" },
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        cellSize: { value: "compact" },
        borderRadius: { value: "0" },
        tableType: { value: "table-bordered" },
      },
    },
  },
  //TwoColumn
  {
    name: "TwoColumn",
    displayName: "Two Column",
    description: "Display paginated tabular data",
    component: "TwoColumn",
    properties: {
      title: {
        type: "string",
        displayName: "Title",
        validation: {
          schema: { type: "string" },
        },
      },
      data: {
        type: "code",
        displayName: "Table data",
        validation: {
          schema: {
            type: "array",
            element: { type: "object" },
            optional: true,
          },
        },
      },
      loadingState: {
        type: "toggle",
        displayName: "Loading state",
        validation: {
          schema: { type: "boolean" },
        },
      },
      columns: {
        type: "array",
        displayName: "Table Columns",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    textWrap: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    textColor: { type: "string" },
                    regex: { type: "string" },
                    minLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    maxLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    customRule: { type: "string" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    activeColor: { type: "string" },
                    isEditable: { type: "boolean" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    dateFormat: { type: "string" },
                    parseDateFormat: { type: "string" },
                    isTimeChecked: { type: "boolean" },
                    isEditable: { type: "boolean" },
                  },
                },
              ],
            },
          },
        },
      },
      rowsPerPage: {
        type: "code",
        displayName: "Number of rows per page",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      serverSidePagination: {
        type: "toggle",
        displayName: "Server-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enableNextButton: {
        type: "toggle",
        displayName: "Enable next page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enabledSort: {
        type: "toggle",
        displayName: "Enable sorting",
        validation: {
          schema: { type: "boolean" },
        },
      },
      hideColumnSelectorButton: {
        type: "toggle",
        displayName: "Hide column selector button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enablePrevButton: {
        type: "toggle",
        displayName: "Enable previous page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      totalRecords: {
        type: "code",
        displayName: "Total records server side",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      clientSidePagination: {
        type: "toggle",
        displayName: "Client-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSearch: {
        type: "toggle",
        displayName: "Server-side search",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSort: {
        type: "toggle",
        displayName: "Server-side sort",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideFilter: {
        type: "toggle",
        displayName: "Server-side filter",
        validation: {
          schema: { type: "boolean" },
        },
      },
      actionButtonBackgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonTextColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
        },
      },
      displaySearchBox: {
        type: "toggle",
        displayName: "Show search box",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showDownloadButton: {
        type: "toggle",
        displayName: "Show download button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showFilterButton: {
        type: "toggle",
        displayName: "Show filter button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkUpdateActions: {
        type: "toggle",
        displayName: "Show update buttons",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkSelector: {
        type: "toggle",
        displayName: "Bulk selection",
        validation: {
          schema: { type: "boolean" },
        },
      },
      highlightSelectedRow: {
        type: "toggle",
        displayName: "Highlight selected row",
        validation: {
          schema: { type: "boolean" },
        },
      },
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop " },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    defaultSize: {
      width: 20,
      height: 300,
    },
    events: {
      onRowHovered: { displayName: "Row hovered" },
      onRowClicked: { displayName: "Row clicked" },
      onBulkUpdate: { displayName: "Save changes" },
      onPageChanged: { displayName: "Page changed" },
      onSearch: { displayName: "Search" },
      onCancelChanges: { displayName: "Cancel changes" },
      onSort: { displayName: "Sort applied" },
      onCellValueChanged: { displayName: "Cell value changed" },
      onFilterChanged: { displayName: "Filter changed" },
    },
    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonRadius: {
        type: "code",
        displayName: "Action Button Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "boolean" }],
          },
        },
      },
      tableType: {
        type: "select",
        displayName: "Table type",
        options: [
          { name: "Bordered", value: "table-bordered" },
          { name: "Borderless", value: "table-borderless" },
          { name: "Classic", value: "table-classic" },
          { name: "Striped", value: "table-striped" },
          { name: "Striped & bordered", value: "table-striped table-bordered" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      cellSize: {
        type: "select",
        displayName: "Cell size",
        options: [
          { name: "Compact", value: "compact" },
          { name: "Spacious", value: "spacious" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      borderRadius: {
        type: "code",
        displayName: "Border Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
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
          { handle: "key", displayName: "Key" },
          { handle: "value", displayName: "Value" },
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
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        title: { value: "Table" },
        visible: { value: "{{true}}" },
        loadingState: { value: "{{false}}" },
        data: {
          value:
            "{{ [ \n\t\t{ ParameterName: 'Example Parameter Name', Value: 3434} \n] }}",
        },
        rowsPerPage: { value: "{{10}}" },
        serverSidePagination: { value: "{{false}}" },
        enableNextButton: { value: "{{true}}" },
        enablePrevButton: { value: "{{true}}" },
        totalRecords: { value: "" },
        clientSidePagination: { value: "{{false}}" },
        serverSideSort: { value: "{{false}}" },
        serverSideFilter: { value: "{{false}}" },
        displaySearchBox: { value: "{{true}}" },
        showDownloadButton: { value: "{{true}}" },
        showFilterButton: { value: "{{true}}" },
        autogenerateColumns: { value: true },
        columns: {
          value: [
            {
              name: "ParameterName",
              id: "e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737",
              autogenerated: true,
            },
            {
              name: "Value",
              id: "5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a",
              autogenerated: true,
            },
          ],
        },
        showBulkUpdateActions: { value: "{{true}}" },
        showBulkSelector: { value: "{{false}}" },
        highlightSelectedRow: { value: "{{false}}" },
        columnSizes: { value: "{{({})}}" },
        actions: { value: [] },
        enabledSort: { value: "{{false}}" },
        hideColumnSelectorButton: { value: "{{false}}" },
      },
      events: [],
      styles: {
        textColor: { value: "#000" },
        actionButtonRadius: { value: "0" },
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        cellSize: { value: "spacious" },
        borderRadius: { value: "0" },
        tableType: { value: "borderless" },
      },
    },
  },
  //  ThreeColumn
  {
    name: "ThreeColumn",
    displayName: "Three Column",
    description: "Display paginated tabular data",
    component: "ThreeColumn",
    properties: {
      title: {
        type: "string",
        displayName: "Title",
        validation: {
          schema: { type: "string" },
        },
      },
      data: {
        type: "code",
        displayName: "Table data",
        validation: {
          schema: {
            type: "array",
            element: { type: "object" },
            optional: true,
          },
        },
      },
      loadingState: {
        type: "toggle",
        displayName: "Loading state",
        validation: {
          schema: { type: "boolean" },
        },
      },
      columns: {
        type: "array",
        displayName: "Table Columns",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    textWrap: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    textColor: { type: "string" },
                    regex: { type: "string" },
                    minLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    maxLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    customRule: { type: "string" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    activeColor: { type: "string" },
                    isEditable: { type: "boolean" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    dateFormat: { type: "string" },
                    parseDateFormat: { type: "string" },
                    isTimeChecked: { type: "boolean" },
                    isEditable: { type: "boolean" },
                  },
                },
              ],
            },
          },
        },
      },
      rowsPerPage: {
        type: "code",
        displayName: "Number of rows per page",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      serverSidePagination: {
        type: "toggle",
        displayName: "Server-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enableNextButton: {
        type: "toggle",
        displayName: "Enable next page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enabledSort: {
        type: "toggle",
        displayName: "Enable sorting",
        validation: {
          schema: { type: "boolean" },
        },
      },
      hideColumnSelectorButton: {
        type: "toggle",
        displayName: "Hide column selector button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enablePrevButton: {
        type: "toggle",
        displayName: "Enable previous page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      totalRecords: {
        type: "code",
        displayName: "Total records server side",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      clientSidePagination: {
        type: "toggle",
        displayName: "Client-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSearch: {
        type: "toggle",
        displayName: "Server-side search",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSort: {
        type: "toggle",
        displayName: "Server-side sort",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideFilter: {
        type: "toggle",
        displayName: "Server-side filter",
        validation: {
          schema: { type: "boolean" },
        },
      },
      actionButtonBackgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonTextColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
        },
      },
      displaySearchBox: {
        type: "toggle",
        displayName: "Show search box",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showDownloadButton: {
        type: "toggle",
        displayName: "Show download button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showFilterButton: {
        type: "toggle",
        displayName: "Show filter button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkUpdateActions: {
        type: "toggle",
        displayName: "Show update buttons",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkSelector: {
        type: "toggle",
        displayName: "Bulk selection",
        validation: {
          schema: { type: "boolean" },
        },
      },
      highlightSelectedRow: {
        type: "toggle",
        displayName: "Highlight selected row",
        validation: {
          schema: { type: "boolean" },
        },
      },
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop " },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    defaultSize: {
      width: 30,
      height: 300,
    },
    events: {
      onRowHovered: { displayName: "Row hovered" },
      onRowClicked: { displayName: "Row clicked" },
      onBulkUpdate: { displayName: "Save changes" },
      onPageChanged: { displayName: "Page changed" },
      onSearch: { displayName: "Search" },
      onCancelChanges: { displayName: "Cancel changes" },
      onSort: { displayName: "Sort applied" },
      onCellValueChanged: { displayName: "Cell value changed" },
      onFilterChanged: { displayName: "Filter changed" },
    },
    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonRadius: {
        type: "code",
        displayName: "Action Button Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "boolean" }],
          },
        },
      },
      tableType: {
        type: "select",
        displayName: "Table type",
        options: [
          { name: "Bordered", value: "table-bordered" },
          { name: "Borderless", value: "table-borderless" },
          { name: "Classic", value: "table-classic" },
          { name: "Striped", value: "table-striped" },
          { name: "Striped & bordered", value: "table-striped table-bordered" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      cellSize: {
        type: "select",
        displayName: "Cell size",
        options: [
          { name: "Compact", value: "compact" },
          { name: "Spacious", value: "spacious" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      borderRadius: {
        type: "code",
        displayName: "Border Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
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
          { handle: "key", displayName: "Key" },
          { handle: "value", displayName: "Value" },
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
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        title: { value: "Table" },
        visible: { value: "{{true}}" },
        loadingState: { value: "{{false}}" },
        data: {
          value:
            "{{ [ \n\t\t{ ParameterName: 'Example Parameter Name', Value: 3434 , Unit: 'gl/mdl'} \n] }}",
        },
        rowsPerPage: { value: "{{10}}" },
        serverSidePagination: { value: "{{false}}" },
        enableNextButton: { value: "{{true}}" },
        enablePrevButton: { value: "{{true}}" },
        totalRecords: { value: "" },
        clientSidePagination: { value: "{{false}}" },
        serverSideSort: { value: "{{false}}" },
        serverSideFilter: { value: "{{false}}" },
        displaySearchBox: { value: "{{true}}" },
        showDownloadButton: { value: "{{true}}" },
        showFilterButton: { value: "{{true}}" },
        autogenerateColumns: { value: true },
        columns: {
          value: [
            {
              name: "ParameterName",
              id: "e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737",
              autogenerated: true,
            },
            {
              name: "Value",
              id: "5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a",
              autogenerated: true,
            },
            {
              name: "Unit",
              id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f",
              autogenerated: true,
            },
          ],
        },
        showBulkUpdateActions: { value: "{{true}}" },
        showBulkSelector: { value: "{{false}}" },
        highlightSelectedRow: { value: "{{false}}" },
        columnSizes: { value: "{{({})}}" },
        actions: { value: [] },
        enabledSort: { value: "{{false}}" },
        hideColumnSelectorButton: { value: "{{false}}" },
      },
      events: [],
      styles: {
        textColor: { value: "#000" },
        actionButtonRadius: { value: "0" },
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        cellSize: { value: "spacious" },
        borderRadius: { value: "0" },
        tableType: { value: "borderless" },
      },
    },
  },
  //fourColumn
  {
    name: "FourColumn",
    displayName: "Four Column",
    description: "Display paginated tabular data",
    component: "FourColumn",
    properties: {
      title: {
        type: "string",
        displayName: "Title",
        validation: {
          schema: { type: "string" },
        },
      },
      data: {
        type: "code",
        displayName: "Table data",
        validation: {
          schema: {
            type: "array",
            element: { type: "object" },
            optional: true,
          },
        },
      },
      loadingState: {
        type: "toggle",
        displayName: "Loading state",
        validation: {
          schema: { type: "boolean" },
        },
      },
      columns: {
        type: "array",
        displayName: "Table Columns",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    textWrap: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    textColor: { type: "string" },
                    regex: { type: "string" },
                    minLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    maxLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    customRule: { type: "string" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    activeColor: { type: "string" },
                    isEditable: { type: "boolean" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    dateFormat: { type: "string" },
                    parseDateFormat: { type: "string" },
                    isTimeChecked: { type: "boolean" },
                    isEditable: { type: "boolean" },
                  },
                },
              ],
            },
          },
        },
      },
      rowsPerPage: {
        type: "code",
        displayName: "Number of rows per page",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      serverSidePagination: {
        type: "toggle",
        displayName: "Server-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enableNextButton: {
        type: "toggle",
        displayName: "Enable next page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enabledSort: {
        type: "toggle",
        displayName: "Enable sorting",
        validation: {
          schema: { type: "boolean" },
        },
      },
      hideColumnSelectorButton: {
        type: "toggle",
        displayName: "Hide column selector button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enablePrevButton: {
        type: "toggle",
        displayName: "Enable previous page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      totalRecords: {
        type: "code",
        displayName: "Total records server side",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      clientSidePagination: {
        type: "toggle",
        displayName: "Client-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSearch: {
        type: "toggle",
        displayName: "Server-side search",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSort: {
        type: "toggle",
        displayName: "Server-side sort",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideFilter: {
        type: "toggle",
        displayName: "Server-side filter",
        validation: {
          schema: { type: "boolean" },
        },
      },
      actionButtonBackgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonTextColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
        },
      },
      displaySearchBox: {
        type: "toggle",
        displayName: "Show search box",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showDownloadButton: {
        type: "toggle",
        displayName: "Show download button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showFilterButton: {
        type: "toggle",
        displayName: "Show filter button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkUpdateActions: {
        type: "toggle",
        displayName: "Show update buttons",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkSelector: {
        type: "toggle",
        displayName: "Bulk selection",
        validation: {
          schema: { type: "boolean" },
        },
      },
      highlightSelectedRow: {
        type: "toggle",
        displayName: "Highlight selected row",
        validation: {
          schema: { type: "boolean" },
        },
      },
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop " },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    defaultSize: {
      width: 41,
      height: 300,
    },
    events: {
      onRowHovered: { displayName: "Row hovered" },
      onRowClicked: { displayName: "Row clicked" },
      onBulkUpdate: { displayName: "Save changes" },
      onPageChanged: { displayName: "Page changed" },
      onSearch: { displayName: "Search" },
      onCancelChanges: { displayName: "Cancel changes" },
      onSort: { displayName: "Sort applied" },
      onCellValueChanged: { displayName: "Cell value changed" },
      onFilterChanged: { displayName: "Filter changed" },
    },
    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonRadius: {
        type: "code",
        displayName: "Action Button Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "boolean" }],
          },
        },
      },
      tableType: {
        type: "select",
        displayName: "Table type",
        options: [
          { name: "Bordered", value: "table-bordered" },
          { name: "Borderless", value: "table-borderless" },
          { name: "Classic", value: "table-classic" },
          { name: "Striped", value: "table-striped" },
          { name: "Striped & bordered", value: "table-striped table-bordered" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      cellSize: {
        type: "select",
        displayName: "Cell size",
        options: [
          { name: "Compact", value: "compact" },
          { name: "Spacious", value: "spacious" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      borderRadius: {
        type: "code",
        displayName: "Border Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
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
          { handle: "key", displayName: "Key" },
          { handle: "value", displayName: "Value" },
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
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        title: { value: "Table" },
        visible: { value: "{{true}}" },
        loadingState: { value: "{{false}}" },

        data: {
          value:
            "{{ [ \n\t\t{ ParameterName: 'Example Parameter Name', Value: 3434 , Unit: 'gl/mdl', NormalRange: '20-30'} \n] }}",
        },
        rowsPerPage: { value: "{{10}}" },
        serverSidePagination: { value: "{{false}}" },
        enableNextButton: { value: "{{true}}" },
        enablePrevButton: { value: "{{true}}" },
        totalRecords: { value: "" },
        clientSidePagination: { value: "{{false}}" },
        serverSideSort: { value: "{{false}}" },
        serverSideFilter: { value: "{{false}}" },
        displaySearchBox: { value: "{{true}}" },
        showDownloadButton: { value: "{{true}}" },
        showFilterButton: { value: "{{true}}" },
        autogenerateColumns: { value: true },
        columns: {
          value: [
            {
              name: "ParameterName",
              id: "e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737",
              autogenerated: true,
            },
            {
              name: "Value",
              id: "5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a",
              autogenerated: true,
            },
            {
              name: "Unit",
              id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f",
              autogenerated: true,
            },
            {
              name: "NormalRange",
              id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe",
              autogenerated: true,
            },
          ],
        },
        showBulkUpdateActions: { value: "{{true}}" },
        showBulkSelector: { value: "{{false}}" },
        highlightSelectedRow: { value: "{{false}}" },
        columnSizes: { value: "{{({})}}" },
        actions: { value: [] },
        enabledSort: { value: "{{false}}" },
        hideColumnSelectorButton: { value: "{{false}}" },
      },
      events: [],
      styles: {
        textColor: { value: "#000" },
        actionButtonRadius: { value: "0" },
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        cellSize: { value: "compact" },
        borderRadius: { value: "0" },
        tableType: { value: "table-bordered" },
      },
    },
  },
  //fivecolumn
  {
    name: "FiveColumn",
    displayName: "Five Column",
    description: "Display paginated tabular data",
    component: "FiveColumn",
    properties: {
      title: {
        type: "string",
        displayName: "Title",
        validation: {
          schema: { type: "string" },
        },
      },
      data: {
        type: "code",
        displayName: "Table data",
        validation: {
          schema: {
            type: "array",
            element: { type: "object" },
            optional: true,
          },
        },
      },
      loadingState: {
        type: "toggle",
        displayName: "Loading state",
        validation: {
          schema: { type: "boolean" },
        },
      },
      columns: {
        type: "array",
        displayName: "Table Columns",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    textWrap: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    textColor: { type: "string" },
                    regex: { type: "string" },
                    minLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    maxLength: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    customRule: { type: "string" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    activeColor: { type: "string" },
                    isEditable: { type: "boolean" },
                  },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    values: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                    labels: {
                      type: "union",
                      schemas: [
                        { type: "array", element: { type: "string" } },
                        { type: "array", element: { type: "number" } },
                      ],
                    },
                  },
                  isEditable: { type: "boolean" },
                },
                {
                  type: "object",
                  object: {
                    columnType: { type: "string" },
                    name: { type: "string" },
                    key: {
                      type: "union",
                      schemas: [{ type: "string" }, { type: "number" }],
                    },
                    dateFormat: { type: "string" },
                    parseDateFormat: { type: "string" },
                    isTimeChecked: { type: "boolean" },
                    isEditable: { type: "boolean" },
                  },
                },
              ],
            },
          },
        },
      },
      rowsPerPage: {
        type: "code",
        displayName: "Number of rows per page",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      serverSidePagination: {
        type: "toggle",
        displayName: "Server-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enableNextButton: {
        type: "toggle",
        displayName: "Enable next page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enabledSort: {
        type: "toggle",
        displayName: "Enable sorting",
        validation: {
          schema: { type: "boolean" },
        },
      },
      hideColumnSelectorButton: {
        type: "toggle",
        displayName: "Hide column selector button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      enablePrevButton: {
        type: "toggle",
        displayName: "Enable previous page button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      totalRecords: {
        type: "code",
        displayName: "Total records server side",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      clientSidePagination: {
        type: "toggle",
        displayName: "Client-side pagination",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSearch: {
        type: "toggle",
        displayName: "Server-side search",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideSort: {
        type: "toggle",
        displayName: "Server-side sort",
        validation: {
          schema: { type: "boolean" },
        },
      },
      serverSideFilter: {
        type: "toggle",
        displayName: "Server-side filter",
        validation: {
          schema: { type: "boolean" },
        },
      },
      actionButtonBackgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonTextColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
        },
      },
      displaySearchBox: {
        type: "toggle",
        displayName: "Show search box",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showDownloadButton: {
        type: "toggle",
        displayName: "Show download button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showFilterButton: {
        type: "toggle",
        displayName: "Show filter button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkUpdateActions: {
        type: "toggle",
        displayName: "Show update buttons",
        validation: {
          schema: { type: "boolean" },
        },
      },
      showBulkSelector: {
        type: "toggle",
        displayName: "Bulk selection",
        validation: {
          schema: { type: "boolean" },
        },
      },
      highlightSelectedRow: {
        type: "toggle",
        displayName: "Highlight selected row",
        validation: {
          schema: { type: "boolean" },
        },
      },
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop " },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    defaultSize: {
      width: 43,
      height: 300,
    },
    events: {
      onRowHovered: { displayName: "Row hovered" },
      onRowClicked: { displayName: "Row clicked" },
      onBulkUpdate: { displayName: "Save changes" },
      onPageChanged: { displayName: "Page changed" },
      onSearch: { displayName: "Search" },
      onCancelChanges: { displayName: "Cancel changes" },
      onSort: { displayName: "Sort applied" },
      onCellValueChanged: { displayName: "Cell value changed" },
      onFilterChanged: { displayName: "Filter changed" },
    },
    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      actionButtonRadius: {
        type: "code",
        displayName: "Action Button Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "boolean" }],
          },
        },
      },
      tableType: {
        type: "select",
        displayName: "Table type",
        options: [
          { name: "Bordered", value: "table-bordered" },
          { name: "Borderless", value: "table-borderless" },
          { name: "Classic", value: "table-classic" },
          { name: "Striped", value: "table-striped" },
          { name: "Striped & bordered", value: "table-striped table-bordered" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      cellSize: {
        type: "select",
        displayName: "Cell size",
        options: [
          { name: "Compact", value: "compact" },
          { name: "Spacious", value: "spacious" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      borderRadius: {
        type: "code",
        displayName: "Border Radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
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
          { handle: "key", displayName: "Key" },
          { handle: "value", displayName: "Value" },
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
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        title: { value: "Table" },
        visible: { value: "{{true}}" },
        loadingState: { value: "{{false}}" },
        data: {
          value:
            "{{ [ \n\t\t{ ParameterName: 'Example Parameter Name', Value: 3434 , Unit: 'gl/mdl', NormalRange: '20-30',Graph:''} \n] }}",
        },
        rowsPerPage: { value: "{{10}}" },
        serverSidePagination: { value: "{{false}}" },
        enableNextButton: { value: "{{true}}" },
        enablePrevButton: { value: "{{true}}" },
        totalRecords: { value: "" },
        clientSidePagination: { value: "{{false}}" },
        serverSideSort: { value: "{{false}}" },
        serverSideFilter: { value: "{{false}}" },
        displaySearchBox: { value: "{{true}}" },
        showDownloadButton: { value: "{{true}}" },
        showFilterButton: { value: "{{true}}" },
        autogenerateColumns: { value: true },
        columns: {
          value: [
            {
              name: "ParameterName",
              id: "e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737",
              autogenerated: true,
            },
            {
              name: "Value",
              id: "5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a",
              autogenerated: true,
            },
            {
              name: "Unit",
              id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f",
              autogenerated: true,
            },
            {
              name: "NormalRange",
              id: "afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe",
              autogenerated: true,
            },
            {
              name: "Graph",
              id: "afc9a5091750a1bd4760e38760de3b4be11dasda43452ae8ae07ce2eebc569fe9a7f",
              autogenerated: true,
            },
          ],
        },
        showBulkUpdateActions: { value: "{{true}}" },
        showBulkSelector: { value: "{{false}}" },
        highlightSelectedRow: { value: "{{false}}" },
        columnSizes: { value: "{{({})}}" },
        actions: { value: [] },
        enabledSort: { value: "{{false}}" },
        hideColumnSelectorButton: { value: "{{false}}" },
      },
      events: [],
      styles: {
        textColor: { value: "#000" },
        actionButtonRadius: { value: "0" },
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        cellSize: { value: "spacious" },
        borderRadius: { value: "0" },
        tableType: { value: "borderless" },
      },
    },
  },
  //button
  {
    name: "Button",
    displayName: "Button",
    description: "Trigger actions: queries, alerts etc",
    component: "Button",
    defaultSize: {
      width: 3,
      height: 30,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      text: {
        type: "code",
        displayName: "Button Text",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    events: {},
    styles: {
      backgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },
      textColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },

      borderRadius: {
        type: "number",
        displayName: "Border radius",
        validation: {
          schema: { type: "number" },
          defaultValue: false,
        },
      },
      borderColor: {
        type: "color",
        displayName: "Border color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },
    },
    exposedVariables: {},
    actions: [],
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        text: { value: `Save` },
      },
      events: [],
      styles: {
        backgroundColor: { value: "#375FCF" },
        textColor: { value: "#fff" },
        borderRadius: { value: "{{0}}" },
        borderColor: { value: "#375FCF" },
      },
    },
  },
  //textinput
  {
    name: "TextInput",
    displayName: "Text Input",
    description: "Text field for forms",
    component: "TextInput",
    defaultSize: {
      width: 6,
      height: 30,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      placeholder: {
        type: "code",
        displayName: "Placeholder",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    validation: {
      regex: { type: "code", displayName: "Regex" },
      minLength: { type: "code", displayName: "Min length" },
      maxLength: { type: "code", displayName: "Max length" },
      customRule: { type: "code", displayName: "Custom validation" },
      isrequired: { type: "toggle", displayName: "isrequired" },
    },

    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: { schema: { type: "string" } },
      },
      backgroundColor: {
        type: "color",
        displayName: "Background Color",
        validation: { schema: { type: "string" } },
      },
      borderColor: {
        type: "color",
        displayName: "Border Color",
        validation: { schema: { type: "string" } },
      },

      borderRadius: {
        type: "code",
        displayName: "Border radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
    },
    exposedVariables: {
      value: "",
    },
    actions: [],
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        placeholder: { value: "Enter your input" },
      },
      validation: {
        isrequired: { value: "{{true}}" },
      },
      events: [],
      styles: {
        textColor: { value: "#000" },
        borderColor: { value: "#dadcde" },

        borderRadius: { value: "{{0}}" },

        backgroundColor: { value: "#fff" },
      },
    },
  },

  //numberinput

  {
    name: "NumberInput",
    displayName: "Number Input",
    description: "Number field for forms",
    component: "NumberInput",
    defaultSize: {
      width: 4,
      height: 30,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      placeholder: {
        type: "code",
        displayName: "Placeholder",
        validation: {
          schema: { type: "string" },
        },
      },
    },

    styles: {
      borderRadius: {
        type: "code",
        displayName: "Border radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      backgroundColor: {
        type: "color",
        displayName: "Background Color",
      },
      borderColor: {
        type: "color",
        displayName: "Border Color",
        validation: {
          schema: { type: "string" },
        },
      },
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: { schema: { type: "string" } },
      },
    },
    exposedVariables: {
      value: 0,
    },
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        placeholder: { value: "0" },
      },
      events: [],
      styles: {
        borderRadius: { value: "{{0}}" },
        backgroundColor: { value: "#ffffffff" },
        borderColor: { value: "#dadcde" },
        textColor: { value: "#232e3c" },
      },
    },
  },
  //Datepicker
  {
    name: "Datepicker",
    displayName: "Date Picker",
    description: "Select a date and time",
    component: "Datepicker",
    defaultSize: {
      width: 5,
      height: 30,
    },
    validation: {
      customRule: { type: "code", displayName: "Custom validation" },
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      defaultValue: {
        type: "code",
        displayName: "Default value",
        validation: {
          schema: { type: "string" },
        },
      },
      format: {
        type: "code",
        displayName: "Format",
        validation: {
          schema: { type: "string" },
        },
      },
      enableTime: {
        type: "toggle",
        displayName: "Enable time selection?",
        validation: {
          schema: { type: "boolean" },
          defaultValue: false,
        },
      },
      enableDate: {
        type: "toggle",
        displayName: "Enable date selection?",
        validation: {
          schema: { type: "boolean" },
          defaultValue: true,
        },
      },
      disabledDates: {
        type: "code",
        displayName: "Disabled dates",
        validation: {
          schema: { type: "array", element: { type: "string" } },
        },
      },
    },
    events: {
      onSelect: { displayName: "On select" },
    },
    styles: {
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
      borderRadius: {
        type: "code",
        displayName: "Border radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
    },
    exposedVariables: {
      value: "",
    },
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      validation: {
        customRule: { value: null },
      },
      properties: {
        defaultValue: { value: "01/01/2022" },
        format: { value: "DD/MM/YYYY" },
        enableTime: { value: "{{false}}" },
        enableDate: { value: "{{true}}" },
        disabledDates: { value: "{{[]}}" },
      },
      events: [],
      styles: {
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        borderRadius: { value: "{{0}}" },
      },
    },
  },
  //checkbox
  {
    name: "Checkbox",
    displayName: "Checkbox",
    description: "A single checkbox",
    component: "Checkbox",
    defaultSize: {
      width: 5,
      height: 30,
    },

    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      label: {
        type: "code",
        displayName: "Label",
        validation: {
          schema: { type: "string" },
        },
      },
    },

    styles: {
      checkboxColor: {
        type: "color",
        displayName: "Checkbox Color",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    exposedVariables: {
      value: false,
    },
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        label: { value: "Checkbox label" },
      },
      events: [],
      styles: {
        checkboxColor: { value: "#00FF2B" },
      },
    },
  },
  //"Radio-button
  {
    name: "Radio-button",
    displayName: "Radio Button",
    description: "Radio buttons",
    component: "RadioButton",
    defaultSize: {
      width: 6,
      height: 60,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      label: {
        type: "code",
        displayName: "Label",
        validation: {
          schema: { type: "string" },
        },
      },

      values: {
        type: "code",
        displayName: "Option values",
        validation: {
          schema: { type: "array", element: { type: "boolean" } },
        },
      },
      display_values: {
        type: "code",
        displayName: "Option labels",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [{ type: "string" }, { type: "number" }],
            },
          },
        },
      },
    },

    styles: {
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      activeColor: {
        type: "color",
        displayName: "Active Color",
        validation: {
          schema: { type: "string" },
        },
      },
    },

    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        label: { value: "Select" },

        values: { value: "{{[true,false]}}" },
        display_values: { value: '{{["yes", "no"]}}' },
      },
      events: [],
      styles: {
        textColor: { value: "" },
        activeColor: { value: "" },
      },
    },
  },
  //text
  {
    name: "Text",
    displayName: "Text",
    description: "Display markdown or HTML",
    component: "Text",
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      text: {
        type: "code",
        displayName: "Text",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
    },
    defaultSize: {
      width: 6,
      height: 30,
    },
    events: [],
    styles: {
      fontWeight: {
        type: "select",
        displayName: "Font Weight",
        options: [
          { name: "normal", value: "normal" },
          { name: "bold", value: "bold" },
          { name: "lighter", value: "lighter" },
          { name: "bolder", value: "bolder" },
        ],
      },
      decoration: {
        type: "select",
        displayName: "Text Decoration",
        options: [
          { name: "none", value: "none" },
          { name: "overline", value: "overline" },
          { name: "line-through", value: "line-through" },
          { name: "underline", value: "underline" },
          { name: "overline underline", value: "overline underline" },
        ],
      },
      transformation: {
        type: "select",
        displayName: "Text Transformation",
        options: [
          { name: "none", value: "none" },
          { name: "uppercase", value: "uppercase" },
          { name: "lowercase", value: "lowercase" },
          { name: "capitalize", value: "capitalize" },
        ],
      },
      fontStyle: {
        type: "select",
        displayName: "Font Style",
        options: [
          { name: "normal", value: "normal" },
          { name: "italic", value: "italic" },
          { name: "oblique", value: "oblique" },
        ],
      },
      lineHeight: { type: "number", displayName: "Line Height" },
      textIndent: { type: "number", displayName: "Text Indent" },
      letterSpacing: { type: "number", displayName: "Letter Spacing" },
      wordSpacing: { type: "number", displayName: "Word Spacing" },
      fontVariant: {
        type: "select",
        displayName: "Font Variant",
        options: [
          { name: "normal", value: "normal" },
          { name: "small-caps", value: "small-caps" },
          { name: "initial", value: "initial" },
          { name: "inherit", value: "inherit" },
        ],
      },
      textSize: {
        type: "number",
        displayName: "Text Size",
        validation: {
          schema: { type: "number" },
        },
      },
      backgroundColor: {
        type: "color",
        displayName: "Background Color",
        validation: {
          schema: { type: "string" },
        },
      },
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      textAlign: {
        type: "alignButtons",
        displayName: "Align Text",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    exposedVariables: {
      text: "Write Your Text ",
    },

    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        text: { value: "Write Your Text " },
      },
      events: [],
      styles: {
        backgroundColor: { value: "" },
        textColor: { value: "#000000" },
        textSize: { value: 14 },
        textAlign: { value: "left" },
        fontWeight: { value: "normal" },
        decoration: { value: "none" },
        transformation: { value: "none" },
        fontStyle: { value: "normal" },
        lineHeight: { value: 1.5 },
        textIndent: { value: 0 },
        letterSpacing: { value: 0 },
        wordSpacing: { value: 0 },
        fontVariant: { value: "normal" },
      },
    },
  },
  //image
  {
    name: "Image",
    displayName: "Image",
    description: "Display an Image",
    defaultSize: {
      width: 3,
      height: 100,
    },
    component: "Image",
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      source: {
        type: "code",
        displayName: "URL",
        validation: {
          schema: { type: "string" },
        },
      },
      loadingState: {
        type: "toggle",
        displayName: "Loading state",
        validation: {
          schema: { type: "boolean" },
        },
      },
      alternativeText: {
        type: "code",
        displayName: "Alternative text",
        validation: {
          schema: { type: "string" },
        },
      },
      zoomButtons: {
        type: "toggle",
        displayName: "Zoom button",
        validation: {
          schema: { type: "boolean" },
        },
      },
      rotateButton: {
        type: "toggle",
        displayName: "Rotate button",
        validation: {
          schema: { type: "boolean" },
        },
      },
    },
    events: {
      onClick: { displayName: "On click" },
    },
    styles: {
      borderType: {
        type: "select",
        displayName: "Border type",
        options: [
          { name: "None", value: "none" },
          { name: "Rounded", value: "rounded" },
          { name: "Circle", value: "rounded-circle" },
          { name: "Thumbnail", value: "img-thumbnail" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
      backgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
        },
      },
      padding: {
        type: "code",
        displayName: "Padding",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
      visibility: {
        type: "toggle",
        displayName: "Visibility",
        validation: {
          schema: { type: "boolean" },
        },
      },
      disabledState: {
        type: "toggle",
        displayName: "Disable",
        validation: {
          schema: { type: "boolean" },
        },
      },
      imageFit: {
        type: "select",
        displayName: "Image fit",
        options: [
          { name: "fill", value: "fill" },
          { name: "contain", value: "contain" },
          { name: "cover", value: "cover" },
          { name: "scale-down", value: "scale-down" },
        ],
        validation: {
          schema: { type: "string" },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        source: { value: "https://www.svgrepo.com/show/34217/image.svg" },
        visible: { value: "{{true}}" },
        loadingState: { value: "{{false}}" },
        alternativeText: { value: "" },
        zoomButtons: { value: "{{false}}" },
        rotateButton: { value: "{{false}}" },
      },
      events: [],
      styles: {
        borderType: { value: "none" },
        padding: { value: "0" },
        visibility: { value: "{{true}}" },
        disabledState: { value: "{{false}}" },
        imageFit: { value: "contain" },
        backgroundColor: { value: "" },
      },
    },
  },
  //dropdonw
  {
    name: "Dropdown",
    displayName: "Dropdown",
    description: "Select one value from options",
    defaultSize: {
      width: 8,
      height: 30,
    },
    component: "DropDown",
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },

    properties: {
      label: {
        type: "code",
        displayName: "Label",
        validation: {
          schema: { type: "string" },
        },
      },

      values: {
        type: "code",
        displayName: "Option values",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                { type: "string" },
                { type: "number" },
                { type: "boolean" },
              ],
            },
          },
        },
      },
      display_values: {
        type: "code",
        displayName: "Option labels",
        validation: {
          schema: {
            type: "array",
            element: {
              type: "union",
              schemas: [
                { type: "string" },
                { type: "number" },
                { type: "boolean" },
              ],
            },
          },
        },
      },
    },

    styles: {
      borderRadius: {
        type: "code",
        displayName: "Border radius",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "number" }, { type: "string" }],
          },
        },
      },

      selectedTextColor: {
        type: "color",
        displayName: "Selected Text Color",
        validation: {
          schema: {
            type: "string",
          },
        },
      },

      justifyContent: {
        type: "alignButtons",
        displayName: "Align Text",
        validation: {
          schema: {
            type: "string",
          },
        },
      },
    },
    exposedVariables: {
      value: 2,
      searchText: "",
      label: "Select",
    },

    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },

      properties: {
        label: { value: "Select" },

        values: { value: "{{[1,2,3]}}" },
        display_values: { value: '{{["one", "two", "three"]}}' },
      },
      events: [],
      styles: {
        borderRadius: { value: "0" },
        justifyContent: { value: "left" },
      },
    },
  },
  //divider
  {
    name: "Divider",
    displayName: "Divider",
    description: "Separator between components",
    component: "Divider",
    defaultSize: {
      width: 10,
      height: 10,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {},
    events: {},
    styles: {
      dividerColor: {
        type: "color",
        displayName: "Divider Color",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    exposedVariables: {
      value: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {},
      events: [],
      styles: {
        dividerColor: { value: "" },
      },
    },
  },
  // vertical divider
  {
    name: "VerticalDivider",
    displayName: "Vertical Divider",
    description: "Vertical Separator between components",
    component: "VerticalDivider",
    defaultSize: {
      width: 2,
      height: 100,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {},
    events: {},
    styles: {
      dividerColor: {
        type: "color",
        displayName: "Divider Color",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    exposedVariables: {
      value: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {},
      events: [],
      styles: {
        dividerColor: { value: "#000000" },
      },
    },
  },
  //ReportResultTable
  {
    name: "ReportResultTable",
    displayName: "Report Result Table",
    description: "Visual representation of a sequence of events",
    component: "ReportResultTable",
    defaultSize: {
      width: 20,
      height: 100,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },

    styles: {
      backgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },
      textColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },
    },
    exposedVariables: {},

    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },

      events: [],
      styles: {
        backgroundColor: { value: "#FFFFFF" },
        textColor: { value: "#080000" },
      },
    },
  },
  //testlist
  {
    name: "TestList",
    displayName: "Test List",
    description: "Renders a list of tests available in database",
    component: "TestList",
    defaultSize: {
      width: 40,
      height: 300,
    },
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },

    styles: {
      backgroundColor: {
        type: "color",
        displayName: "Background color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },
      textColor: {
        type: "color",
        displayName: "Text color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },
      onHoverColor: {
        type: "color",
        displayName: "Test Hover color",
        validation: {
          schema: { type: "string" },
          defaultValue: false,
        },
      },

      borderRadius: {
        type: "number",
        displayName: "Border radius",
        validation: {
          schema: { type: "number" },
          defaultValue: false,
        },
      },
    },
    exposedVariables: {},

    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },

      events: [],
      styles: {
        backgroundColor: { value: "#FFFFFF" },
        textColor: { value: "#080000" },
        onHoverColor: { value: "#BCBAF1" },
      },
    },
  },
  //demographics field
  {
    name: "DemographicField",
    displayName: "Demographic Field",
    description: "Display markdown or HTML",
    component: "DemographicField",
    others: {
      showOnDesktop: { type: "toggle", displayName: "Show on desktop" },
      showOnMobile: { type: "toggle", displayName: "Show on mobile" },
    },
    properties: {
      text: {
        type: "code",
        displayName: "Text",
        validation: {
          schema: {
            type: "union",
            schemas: [{ type: "string" }, { type: "number" }],
          },
        },
      },
    },
    defaultSize: {
      width: 6,
      height: 30,
    },
    events: [],
    styles: {
      fontWeight: {
        type: "select",
        displayName: "Font Weight",
        options: [
          { name: "normal", value: "normal" },
          { name: "bold", value: "bold" },
          { name: "lighter", value: "lighter" },
          { name: "bolder", value: "bolder" },
        ],
      },
      decoration: {
        type: "select",
        displayName: "Text Decoration",
        options: [
          { name: "none", value: "none" },
          { name: "overline", value: "overline" },
          { name: "line-through", value: "line-through" },
          { name: "underline", value: "underline" },
          { name: "overline underline", value: "overline underline" },
        ],
      },
      transformation: {
        type: "select",
        displayName: "Text Transformation",
        options: [
          { name: "none", value: "none" },
          { name: "uppercase", value: "uppercase" },
          { name: "lowercase", value: "lowercase" },
          { name: "capitalize", value: "capitalize" },
        ],
      },
      fontStyle: {
        type: "select",
        displayName: "Font Style",
        options: [
          { name: "normal", value: "normal" },
          { name: "italic", value: "italic" },
          { name: "oblique", value: "oblique" },
        ],
      },
      lineHeight: { type: "number", displayName: "Line Height" },
      textIndent: { type: "number", displayName: "Text Indent" },
      letterSpacing: { type: "number", displayName: "Letter Spacing" },
      wordSpacing: { type: "number", displayName: "Word Spacing" },
      fontVariant: {
        type: "select",
        displayName: "Font Variant",
        options: [
          { name: "normal", value: "normal" },
          { name: "small-caps", value: "small-caps" },
          { name: "initial", value: "initial" },
          { name: "inherit", value: "inherit" },
        ],
      },
      textSize: {
        type: "number",
        displayName: "Text Size",
        validation: {
          schema: { type: "number" },
        },
      },
      backgroundColor: {
        type: "color",
        displayName: "Background Color",
        validation: {
          schema: { type: "string" },
        },
      },
      textColor: {
        type: "color",
        displayName: "Text Color",
        validation: {
          schema: { type: "string" },
        },
      },
      textAlign: {
        type: "alignButtons",
        displayName: "Align Text",
        validation: {
          schema: { type: "string" },
        },
      },
    },
    exposedVariables: {
      text: "Write Your Text ",
    },

    definition: {
      others: {
        showOnDesktop: { value: "{{true}}" },
        showOnMobile: { value: "{{false}}" },
      },
      properties: {
        text: { value: "Write Your Text " },
      },
      events: [],
      styles: {
        backgroundColor: { value: "" },
        textColor: { value: "#000000" },
        textSize: { value: 14 },
        textAlign: { value: "left" },
        fontWeight: { value: "normal" },
        decoration: { value: "none" },
        transformation: { value: "none" },
        fontStyle: { value: "normal" },
        lineHeight: { value: 1.5 },
        textIndent: { value: 0 },
        letterSpacing: { value: 0 },
        wordSpacing: { value: 0 },
        fontVariant: { value: "normal" },
      },
    },
  },
];
