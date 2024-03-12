const temp = {
  id: '42af8904-10f3-43e9-a76d-984feb4a8cc4',
  name: '2',
  definition: {
    showViewerNavigation: true,
    homePageId: '3f4387dd-09d1-4742-8ff8-741874c5f039',
    pages: {
      '3f4387dd-09d1-4742-8ff8-741874c5f039': {
        components: {
          '151b2ae8-5fb3-4d2b-b597-cae01de26ca4': {
            component: {
              properties: {
                title: {
                  type: 'string',
                  displayName: 'Title',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                data: {
                  type: 'code',
                  displayName: 'Table data',
                  validation: {
                    schema: {
                      type: 'array',
                      element: {
                        type: 'object',
                      },
                      optional: true,
                    },
                  },
                },
                loadingState: {
                  type: 'toggle',
                  displayName: 'Loading state',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                columns: {
                  type: 'array',
                  displayName: 'Table Columns',
                },
                rowsPerPage: {
                  type: 'code',
                  displayName: 'Number of rows per page',
                  validation: {
                    schema: {
                      type: 'union',
                      schemas: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'number',
                        },
                      ],
                    },
                  },
                },
                serverSidePagination: {
                  type: 'toggle',
                  displayName: 'Server-side pagination',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                enableNextButton: {
                  type: 'toggle',
                  displayName: 'Enable next page button',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                enabledSort: {
                  type: 'toggle',
                  displayName: 'Enable sorting',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                hideColumnSelectorButton: {
                  type: 'toggle',
                  displayName: 'Hide column selector button',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                enablePrevButton: {
                  type: 'toggle',
                  displayName: 'Enable previous page button',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                totalRecords: {
                  type: 'code',
                  displayName: 'Total records server side',
                  validation: {
                    schema: {
                      type: 'union',
                      schemas: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'number',
                        },
                      ],
                    },
                  },
                },
                clientSidePagination: {
                  type: 'toggle',
                  displayName: 'Client-side pagination',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                serverSideSearch: {
                  type: 'toggle',
                  displayName: 'Server-side search',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                serverSideSort: {
                  type: 'toggle',
                  displayName: 'Server-side sort',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                serverSideFilter: {
                  type: 'toggle',
                  displayName: 'Server-side filter',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                actionButtonBackgroundColor: {
                  type: 'color',
                  displayName: 'Background color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                actionButtonTextColor: {
                  type: 'color',
                  displayName: 'Text color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                displaySearchBox: {
                  type: 'toggle',
                  displayName: 'Show search box',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                showDownloadButton: {
                  type: 'toggle',
                  displayName: 'Show download button',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                showFilterButton: {
                  type: 'toggle',
                  displayName: 'Show filter button',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                showBulkUpdateActions: {
                  type: 'toggle',
                  displayName: 'Show update buttons',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                showBulkSelector: {
                  type: 'toggle',
                  displayName: 'Bulk selection',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                highlightSelectedRow: {
                  type: 'toggle',
                  displayName: 'Highlight selected row',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
              },
              general: {
                tooltip: {
                  type: 'code',
                  displayName: 'Tooltip',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
              },
              others: {
                showOnDesktop: {
                  type: 'toggle',
                  displayName: 'Show on desktop ',
                },
                showOnMobile: {
                  type: 'toggle',
                  displayName: 'Show on mobile',
                },
              },
              events: {
                onRowHovered: {
                  displayName: 'Row hovered',
                },
                onRowClicked: {
                  displayName: 'Row clicked',
                },
                onBulkUpdate: {
                  displayName: 'Save changes',
                },
                onPageChanged: {
                  displayName: 'Page changed',
                },
                onSearch: {
                  displayName: 'Search',
                },
                onCancelChanges: {
                  displayName: 'Cancel changes',
                },
                onSort: {
                  displayName: 'Sort applied',
                },
                onCellValueChanged: {
                  displayName: 'Cell value changed',
                },
                onFilterChanged: {
                  displayName: 'Filter changed',
                },
              },
              styles: {
                textColor: {
                  type: 'color',
                  displayName: 'Text Color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                actionButtonRadius: {
                  type: 'code',
                  displayName: 'Action Button Radius',
                  validation: {
                    schema: {
                      type: 'union',
                      schemas: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'boolean',
                        },
                      ],
                    },
                  },
                },
                tableType: {
                  type: 'select',
                  displayName: 'Table type',
                  options: [
                    {
                      name: 'Bordered',
                      value: 'table-bordered',
                    },
                    {
                      name: 'Borderless',
                      value: 'table-borderless',
                    },
                    {
                      name: 'Classic',
                      value: 'table-classic',
                    },
                    {
                      name: 'Striped',
                      value: 'table-striped',
                    },
                    {
                      name: 'Striped & bordered',
                      value: 'table-striped table-bordered',
                    },
                  ],
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                cellSize: {
                  type: 'select',
                  displayName: 'Cell size',
                  options: [
                    {
                      name: 'Compact',
                      value: 'compact',
                    },
                    {
                      name: 'Spacious',
                      value: 'spacious',
                    },
                  ],
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                borderRadius: {
                  type: 'code',
                  displayName: 'Border Radius',
                  validation: {
                    schema: {
                      type: 'union',
                      schemas: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'number',
                        },
                      ],
                    },
                  },
                },
                visibility: {
                  type: 'toggle',
                  displayName: 'Visibility',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
                disabledState: {
                  type: 'toggle',
                  displayName: 'Disable',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
              },
              validate: true,
              generalStyles: {
                boxShadow: {
                  type: 'boxShadow',
                  displayName: 'Box Shadow',
                },
              },
              definition: {
                others: {
                  showOnDesktop: {
                    value: '{{true}}',
                  },
                  showOnMobile: {
                    value: '{{false}}',
                  },
                },
                events: [],
                styles: {
                  textColor: {
                    value: '#000',
                  },
                  actionButtonRadius: {
                    value: '0',
                  },
                  visibility: {
                    value: '{{true}}',
                  },
                  disabledState: {
                    value: '{{false}}',
                  },
                  cellSize: {
                    value: 'compact',
                  },
                  borderRadius: {
                    value: '0',
                  },
                  tableType: {
                    value: 'table-bordered',
                  },
                },
                generalStyles: {
                  boxShadow: {
                    value: '0px 0px 0px 0px #00000040',
                  },
                },
                properties: {
                  title: {
                    value: 'Table',
                  },
                  visible: {
                    value: '{{true}}',
                  },
                  loadingState: {
                    value: '{{false}}',
                  },
                  data: {
                    value:
                      "{{ [ \n\t\t{ id: 1, name: 'ddd', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}",
                  },
                  rowsPerPage: {
                    value: '{{10}}',
                  },
                  serverSidePagination: {
                    value: '{{false}}',
                  },
                  enableNextButton: {
                    value: '{{true}}',
                  },
                  enablePrevButton: {
                    value: '{{true}}',
                  },
                  totalRecords: {
                    value: '',
                  },
                  clientSidePagination: {
                    value: '{{true}}',
                  },
                  serverSideSort: {
                    value: '{{false}}',
                  },
                  serverSideFilter: {
                    value: '{{false}}',
                  },
                  displaySearchBox: {
                    value: '{{true}}',
                  },
                  showDownloadButton: {
                    value: '{{true}}',
                  },
                  showFilterButton: {
                    value: '{{true}}',
                  },
                  autogenerateColumns: {
                    value: true,
                  },
                  columns: {
                    value: [
                      {
                        name: 'id',
                        id: 'e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737',
                        autogenerated: true,
                      },
                      {
                        name: 'name',
                        id: '5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a',
                        autogenerated: true,
                      },
                      {
                        name: 'email',
                        id: 'afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f',
                        autogenerated: true,
                      },
                    ],
                  },
                  showBulkUpdateActions: {
                    value: '{{true}}',
                  },
                  showBulkSelector: {
                    value: '{{false}}',
                  },
                  highlightSelectedRow: {
                    value: '{{false}}',
                  },
                  columnSizes: {
                    value: '{{({})}}',
                  },
                  actions: {
                    value: [],
                  },
                  enabledSort: {
                    value: '{{true}}',
                  },
                  hideColumnSelectorButton: {
                    value: '{{false}}',
                  },
                },
                general: {},
                exposedVariables: {},
              },
              name: 'table1',
              displayName: 'Table',
              description: 'Display paginated tabular data',
              component: 'Table',
              defaultSize: {
                width: 20,
                height: 300,
              },
              exposedVariables: {
                selectedRow: {},
                changeSet: {},
                dataUpdates: [],
                pageIndex: 1,
                searchText: '',
                selectedRows: [],
                filters: [],
              },
              actions: [
                {
                  handle: 'setPage',
                  displayName: 'Set page',
                  params: [
                    {
                      handle: 'page',
                      displayName: 'Page',
                      defaultValue: '{{1}}',
                    },
                  ],
                },
                {
                  handle: 'selectRow',
                  displayName: 'Select row',
                  params: [
                    {
                      handle: 'key',
                      displayName: 'Key',
                    },
                    {
                      handle: 'value',
                      displayName: 'Value',
                    },
                  ],
                },
                {
                  handle: 'deselectRow',
                  displayName: 'Deselect row',
                },
                {
                  handle: 'discardChanges',
                  displayName: 'Discard Changes',
                },
              ],
            },
            layouts: {
              desktop: {
                top: 110,
                left: 25.58139522232899,
                width: 20,
                height: 300,
              },
            },
            withDefaultChildren: false,
          },
          '89fdd1eb-ddc8-48ad-b146-b388e2e215a7': {
            component: {
              properties: {
                text: {
                  type: 'code',
                  displayName: 'Button Text',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
                loadingState: {
                  type: 'toggle',
                  displayName: 'Loading State',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                  },
                },
              },
              general: {
                tooltip: {
                  type: 'code',
                  displayName: 'Tooltip',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                  },
                },
              },
              others: {
                showOnDesktop: {
                  type: 'toggle',
                  displayName: 'Show on desktop',
                },
                showOnMobile: {
                  type: 'toggle',
                  displayName: 'Show on mobile',
                },
              },
              events: {
                onClick: {
                  displayName: 'On click',
                },
                onHover: {
                  displayName: 'On hover',
                },
              },
              styles: {
                backgroundColor: {
                  type: 'color',
                  displayName: 'Background color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                    defaultValue: false,
                  },
                },
                textColor: {
                  type: 'color',
                  displayName: 'Text color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                    defaultValue: false,
                  },
                },
                loaderColor: {
                  type: 'color',
                  displayName: 'Loader color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                    defaultValue: false,
                  },
                },
                visibility: {
                  type: 'toggle',
                  displayName: 'Visibility',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                    defaultValue: false,
                  },
                },
                disabledState: {
                  type: 'toggle',
                  displayName: 'Disable',
                  validation: {
                    schema: {
                      type: 'boolean',
                    },
                    defaultValue: false,
                  },
                },
                borderRadius: {
                  type: 'number',
                  displayName: 'Border radius',
                  validation: {
                    schema: {
                      type: 'number',
                    },
                    defaultValue: false,
                  },
                },
                borderColor: {
                  type: 'color',
                  displayName: 'Border color',
                  validation: {
                    schema: {
                      type: 'string',
                    },
                    defaultValue: false,
                  },
                },
              },
              validate: true,
              generalStyles: {
                boxShadow: {
                  type: 'boxShadow',
                  displayName: 'Box Shadow',
                },
              },
              definition: {
                others: {
                  showOnDesktop: {
                    value: '{{true}}',
                  },
                  showOnMobile: {
                    value: '{{false}}',
                  },
                },
                events: [],
                styles: {
                  backgroundColor: {
                    value: '#375FCF',
                  },
                  textColor: {
                    value: '#fff',
                  },
                  loaderColor: {
                    value: '#fff',
                  },
                  visibility: {
                    value: '{{true}}',
                  },
                  borderRadius: {
                    value: '{{0}}',
                  },
                  borderColor: {
                    value: '#375FCF',
                  },
                  disabledState: {
                    value: '{{false}}',
                  },
                },
                generalStyles: {
                  boxShadow: {
                    value: '0px 0px 0px 0px #00000040',
                  },
                },
                properties: {
                  text: {
                    value: 'Button',
                  },
                  loadingState: {
                    value: '{{false}}',
                  },
                },
                general: {},
                exposedVariables: {},
              },
              name: 'button1',
              displayName: 'Button',
              description: 'Trigger actions: queries, alerts etc',
              component: 'Button',
              defaultSize: {
                width: 3,
                height: 30,
              },
              exposedVariables: {},
              actions: [
                {
                  handle: 'click',
                  displayName: 'Click',
                },
                {
                  handle: 'setText',
                  displayName: 'Set Text',
                  params: [
                    {
                      handle: 'text',
                      displayName: 'Text',
                      defaultValue: 'New Text',
                    },
                  ],
                },
                {
                  handle: 'disable',
                  displayName: 'Disable',
                  params: [
                    {
                      handle: 'disable',
                      displayName: 'Value',
                      defaultValue: '{{false}}',
                      type: 'toggle',
                    },
                  ],
                },
                {
                  handle: 'visibility',
                  displayName: 'Visibility',
                  params: [
                    {
                      handle: 'visible',
                      displayName: 'Value',
                      defaultValue: '{{false}}',
                      type: 'toggle',
                    },
                  ],
                },
                {
                  handle: 'loading',
                  displayName: 'Loading',
                  params: [
                    {
                      handle: 'loading',
                      displayName: 'Value',
                      defaultValue: '{{false}}',
                      type: 'toggle',
                    },
                  ],
                },
              ],
            },
            layouts: {
              desktop: {
                top: 410,
                left: 76.74418566698697,
                width: 3,
                height: 30,
              },
            },
            withDefaultChildren: false,
          },
        },
        handle: 'home',
        name: 'Home',
      },
    },
    globalSettings: {
      hideHeader: false,
      appInMaintenance: false,
      canvasMaxWidth: 794,
      canvasMaxWidthType: 'px',
      canvasMaxHeight: 1135,
      canvasBackgroundColor: '#edeff5',
      backgroundFxQuery: '',
    },
  },
  appId: '0d785af0-c4de-4a66-a390-dfd23146f919',
  createdAt: '2023-03-23T11:44:40.102Z',
  updatedAt: '2023-03-23T12:10:40.604Z',
  app: {
    id: '0d785af0-c4de-4a66-a390-dfd23146f919',
    name: 'Untitled app',
    slug: '0d785af0-c4de-4a66-a390-dfd23146f919',
    isPublic: false,
    isMaintenanceOn: false,
    icon: 'business',
    organizationId: 'c13faa70-4503-46d1-b0d6-2850386ab7fc',
    currentVersionId: '55f333a4-9dd6-473e-a6cd-dd6493c13908',
    userId: '1383fe7f-3596-48e2-9697-29102291f3fd',
    createdAt: '2023-03-20T12:43:35.375Z',
    updatedAt: '2023-03-23T10:43:27.192Z',
    editingVersion: {
      id: '42af8904-10f3-43e9-a76d-984feb4a8cc4',
      name: '2',
      definition: {
        showViewerNavigation: true,
        homePageId: '3f4387dd-09d1-4742-8ff8-741874c5f039',
        pages: {
          '3f4387dd-09d1-4742-8ff8-741874c5f039': {
            components: {
              '151b2ae8-5fb3-4d2b-b597-cae01de26ca4': {
                component: {
                  properties: {
                    title: {
                      type: 'string',
                      displayName: 'Title',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    data: {
                      type: 'code',
                      displayName: 'Table data',
                      validation: {
                        schema: {
                          type: 'array',
                          element: {
                            type: 'object',
                          },
                          optional: true,
                        },
                      },
                    },
                    loadingState: {
                      type: 'toggle',
                      displayName: 'Loading state',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    columns: {
                      type: 'array',
                      displayName: 'Table Columns',
                    },
                    rowsPerPage: {
                      type: 'code',
                      displayName: 'Number of rows per page',
                      validation: {
                        schema: {
                          type: 'union',
                          schemas: [
                            {
                              type: 'string',
                            },
                            {
                              type: 'number',
                            },
                          ],
                        },
                      },
                    },
                    serverSidePagination: {
                      type: 'toggle',
                      displayName: 'Server-side pagination',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    enableNextButton: {
                      type: 'toggle',
                      displayName: 'Enable next page button',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    enabledSort: {
                      type: 'toggle',
                      displayName: 'Enable sorting',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    hideColumnSelectorButton: {
                      type: 'toggle',
                      displayName: 'Hide column selector button',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    enablePrevButton: {
                      type: 'toggle',
                      displayName: 'Enable previous page button',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    totalRecords: {
                      type: 'code',
                      displayName: 'Total records server side',
                      validation: {
                        schema: {
                          type: 'union',
                          schemas: [
                            {
                              type: 'string',
                            },
                            {
                              type: 'number',
                            },
                          ],
                        },
                      },
                    },
                    clientSidePagination: {
                      type: 'toggle',
                      displayName: 'Client-side pagination',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    serverSideSearch: {
                      type: 'toggle',
                      displayName: 'Server-side search',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    serverSideSort: {
                      type: 'toggle',
                      displayName: 'Server-side sort',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    serverSideFilter: {
                      type: 'toggle',
                      displayName: 'Server-side filter',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    actionButtonBackgroundColor: {
                      type: 'color',
                      displayName: 'Background color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    actionButtonTextColor: {
                      type: 'color',
                      displayName: 'Text color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    displaySearchBox: {
                      type: 'toggle',
                      displayName: 'Show search box',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    showDownloadButton: {
                      type: 'toggle',
                      displayName: 'Show download button',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    showFilterButton: {
                      type: 'toggle',
                      displayName: 'Show filter button',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    showBulkUpdateActions: {
                      type: 'toggle',
                      displayName: 'Show update buttons',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    showBulkSelector: {
                      type: 'toggle',
                      displayName: 'Bulk selection',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    highlightSelectedRow: {
                      type: 'toggle',
                      displayName: 'Highlight selected row',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                  },
                  general: {
                    tooltip: {
                      type: 'code',
                      displayName: 'Tooltip',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                  },
                  others: {
                    showOnDesktop: {
                      type: 'toggle',
                      displayName: 'Show on desktop ',
                    },
                    showOnMobile: {
                      type: 'toggle',
                      displayName: 'Show on mobile',
                    },
                  },
                  events: {
                    onRowHovered: {
                      displayName: 'Row hovered',
                    },
                    onRowClicked: {
                      displayName: 'Row clicked',
                    },
                    onBulkUpdate: {
                      displayName: 'Save changes',
                    },
                    onPageChanged: {
                      displayName: 'Page changed',
                    },
                    onSearch: {
                      displayName: 'Search',
                    },
                    onCancelChanges: {
                      displayName: 'Cancel changes',
                    },
                    onSort: {
                      displayName: 'Sort applied',
                    },
                    onCellValueChanged: {
                      displayName: 'Cell value changed',
                    },
                    onFilterChanged: {
                      displayName: 'Filter changed',
                    },
                  },
                  styles: {
                    textColor: {
                      type: 'color',
                      displayName: 'Text Color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    actionButtonRadius: {
                      type: 'code',
                      displayName: 'Action Button Radius',
                      validation: {
                        schema: {
                          type: 'union',
                          schemas: [
                            {
                              type: 'string',
                            },
                            {
                              type: 'boolean',
                            },
                          ],
                        },
                      },
                    },
                    tableType: {
                      type: 'select',
                      displayName: 'Table type',
                      options: [
                        {
                          name: 'Bordered',
                          value: 'table-bordered',
                        },
                        {
                          name: 'Borderless',
                          value: 'table-borderless',
                        },
                        {
                          name: 'Classic',
                          value: 'table-classic',
                        },
                        {
                          name: 'Striped',
                          value: 'table-striped',
                        },
                        {
                          name: 'Striped & bordered',
                          value: 'table-striped table-bordered',
                        },
                      ],
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    cellSize: {
                      type: 'select',
                      displayName: 'Cell size',
                      options: [
                        {
                          name: 'Compact',
                          value: 'compact',
                        },
                        {
                          name: 'Spacious',
                          value: 'spacious',
                        },
                      ],
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    borderRadius: {
                      type: 'code',
                      displayName: 'Border Radius',
                      validation: {
                        schema: {
                          type: 'union',
                          schemas: [
                            {
                              type: 'string',
                            },
                            {
                              type: 'number',
                            },
                          ],
                        },
                      },
                    },
                    visibility: {
                      type: 'toggle',
                      displayName: 'Visibility',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                    disabledState: {
                      type: 'toggle',
                      displayName: 'Disable',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                  },
                  validate: true,
                  generalStyles: {
                    boxShadow: {
                      type: 'boxShadow',
                      displayName: 'Box Shadow',
                    },
                  },
                  definition: {
                    others: {
                      showOnDesktop: {
                        value: '{{true}}',
                      },
                      showOnMobile: {
                        value: '{{false}}',
                      },
                    },
                    events: [],
                    styles: {
                      textColor: {
                        value: '#000',
                      },
                      actionButtonRadius: {
                        value: '0',
                      },
                      visibility: {
                        value: '{{true}}',
                      },
                      disabledState: {
                        value: '{{false}}',
                      },
                      cellSize: {
                        value: 'compact',
                      },
                      borderRadius: {
                        value: '0',
                      },
                      tableType: {
                        value: 'table-bordered',
                      },
                    },
                    generalStyles: {
                      boxShadow: {
                        value: '0px 0px 0px 0px #00000040',
                      },
                    },
                    properties: {
                      title: {
                        value: 'Table',
                      },
                      visible: {
                        value: '{{true}}',
                      },
                      loadingState: {
                        value: '{{false}}',
                      },
                      data: {
                        value:
                          "{{ [ \n\t\t{ id: 1, name: 'ddd', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}",
                      },
                      rowsPerPage: {
                        value: '{{10}}',
                      },
                      serverSidePagination: {
                        value: '{{false}}',
                      },
                      enableNextButton: {
                        value: '{{true}}',
                      },
                      enablePrevButton: {
                        value: '{{true}}',
                      },
                      totalRecords: {
                        value: '',
                      },
                      clientSidePagination: {
                        value: '{{true}}',
                      },
                      serverSideSort: {
                        value: '{{false}}',
                      },
                      serverSideFilter: {
                        value: '{{false}}',
                      },
                      displaySearchBox: {
                        value: '{{true}}',
                      },
                      showDownloadButton: {
                        value: '{{true}}',
                      },
                      showFilterButton: {
                        value: '{{true}}',
                      },
                      autogenerateColumns: {
                        value: true,
                      },
                      columns: {
                        value: [
                          {
                            name: 'id',
                            id: 'e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737',
                            autogenerated: true,
                          },
                          {
                            name: 'name',
                            id: '5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a',
                            autogenerated: true,
                          },
                          {
                            name: 'email',
                            id: 'afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f',
                            autogenerated: true,
                          },
                        ],
                      },
                      showBulkUpdateActions: {
                        value: '{{true}}',
                      },
                      showBulkSelector: {
                        value: '{{false}}',
                      },
                      highlightSelectedRow: {
                        value: '{{false}}',
                      },
                      columnSizes: {
                        value: '{{({})}}',
                      },
                      actions: {
                        value: [],
                      },
                      enabledSort: {
                        value: '{{true}}',
                      },
                      hideColumnSelectorButton: {
                        value: '{{false}}',
                      },
                    },
                    general: {},
                    exposedVariables: {},
                  },
                  name: 'table1',
                  displayName: 'Table',
                  description: 'Display paginated tabular data',
                  component: 'Table',
                  defaultSize: {
                    width: 20,
                    height: 300,
                  },
                  exposedVariables: {
                    selectedRow: {},
                    changeSet: {},
                    dataUpdates: [],
                    pageIndex: 1,
                    searchText: '',
                    selectedRows: [],
                    filters: [],
                  },
                  actions: [
                    {
                      handle: 'setPage',
                      displayName: 'Set page',
                      params: [
                        {
                          handle: 'page',
                          displayName: 'Page',
                          defaultValue: '{{1}}',
                        },
                      ],
                    },
                    {
                      handle: 'selectRow',
                      displayName: 'Select row',
                      params: [
                        {
                          handle: 'key',
                          displayName: 'Key',
                        },
                        {
                          handle: 'value',
                          displayName: 'Value',
                        },
                      ],
                    },
                    {
                      handle: 'deselectRow',
                      displayName: 'Deselect row',
                    },
                    {
                      handle: 'discardChanges',
                      displayName: 'Discard Changes',
                    },
                  ],
                },
                layouts: {
                  desktop: {
                    top: 110,
                    left: 25.58139522232899,
                    width: 20,
                    height: 300,
                  },
                },
                withDefaultChildren: false,
              },
              '89fdd1eb-ddc8-48ad-b146-b388e2e215a7': {
                component: {
                  properties: {
                    text: {
                      type: 'code',
                      displayName: 'Button Text',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                    loadingState: {
                      type: 'toggle',
                      displayName: 'Loading State',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                      },
                    },
                  },
                  general: {
                    tooltip: {
                      type: 'code',
                      displayName: 'Tooltip',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                      },
                    },
                  },
                  others: {
                    showOnDesktop: {
                      type: 'toggle',
                      displayName: 'Show on desktop',
                    },
                    showOnMobile: {
                      type: 'toggle',
                      displayName: 'Show on mobile',
                    },
                  },
                  events: {
                    onClick: {
                      displayName: 'On click',
                    },
                    onHover: {
                      displayName: 'On hover',
                    },
                  },
                  styles: {
                    backgroundColor: {
                      type: 'color',
                      displayName: 'Background color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                        defaultValue: false,
                      },
                    },
                    textColor: {
                      type: 'color',
                      displayName: 'Text color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                        defaultValue: false,
                      },
                    },
                    loaderColor: {
                      type: 'color',
                      displayName: 'Loader color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                        defaultValue: false,
                      },
                    },
                    visibility: {
                      type: 'toggle',
                      displayName: 'Visibility',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                        defaultValue: false,
                      },
                    },
                    disabledState: {
                      type: 'toggle',
                      displayName: 'Disable',
                      validation: {
                        schema: {
                          type: 'boolean',
                        },
                        defaultValue: false,
                      },
                    },
                    borderRadius: {
                      type: 'number',
                      displayName: 'Border radius',
                      validation: {
                        schema: {
                          type: 'number',
                        },
                        defaultValue: false,
                      },
                    },
                    borderColor: {
                      type: 'color',
                      displayName: 'Border color',
                      validation: {
                        schema: {
                          type: 'string',
                        },
                        defaultValue: false,
                      },
                    },
                  },
                  validate: true,
                  generalStyles: {
                    boxShadow: {
                      type: 'boxShadow',
                      displayName: 'Box Shadow',
                    },
                  },
                  definition: {
                    others: {
                      showOnDesktop: {
                        value: '{{true}}',
                      },
                      showOnMobile: {
                        value: '{{false}}',
                      },
                    },
                    events: [],
                    styles: {
                      backgroundColor: {
                        value: '#375FCF',
                      },
                      textColor: {
                        value: '#fff',
                      },
                      loaderColor: {
                        value: '#fff',
                      },
                      visibility: {
                        value: '{{true}}',
                      },
                      borderRadius: {
                        value: '{{0}}',
                      },
                      borderColor: {
                        value: '#375FCF',
                      },
                      disabledState: {
                        value: '{{false}}',
                      },
                    },
                    generalStyles: {
                      boxShadow: {
                        value: '0px 0px 0px 0px #00000040',
                      },
                    },
                    properties: {
                      text: {
                        value: 'Button',
                      },
                      loadingState: {
                        value: '{{false}}',
                      },
                    },
                    general: {},
                    exposedVariables: {},
                  },
                  name: 'button1',
                  displayName: 'Button',
                  description: 'Trigger actions: queries, alerts etc',
                  component: 'Button',
                  defaultSize: {
                    width: 3,
                    height: 30,
                  },
                  exposedVariables: {},
                  actions: [
                    {
                      handle: 'click',
                      displayName: 'Click',
                    },
                    {
                      handle: 'setText',
                      displayName: 'Set Text',
                      params: [
                        {
                          handle: 'text',
                          displayName: 'Text',
                          defaultValue: 'New Text',
                        },
                      ],
                    },
                    {
                      handle: 'disable',
                      displayName: 'Disable',
                      params: [
                        {
                          handle: 'disable',
                          displayName: 'Value',
                          defaultValue: '{{false}}',
                          type: 'toggle',
                        },
                      ],
                    },
                    {
                      handle: 'visibility',
                      displayName: 'Visibility',
                      params: [
                        {
                          handle: 'visible',
                          displayName: 'Value',
                          defaultValue: '{{false}}',
                          type: 'toggle',
                        },
                      ],
                    },
                    {
                      handle: 'loading',
                      displayName: 'Loading',
                      params: [
                        {
                          handle: 'loading',
                          displayName: 'Value',
                          defaultValue: '{{false}}',
                          type: 'toggle',
                        },
                      ],
                    },
                  ],
                },
                layouts: {
                  desktop: {
                    top: 410,
                    left: 76.74418566698697,
                    width: 3,
                    height: 30,
                  },
                },
                withDefaultChildren: false,
              },
            },
            handle: 'home',
            name: 'Home',
          },
        },
        globalSettings: {
          hideHeader: false,
          appInMaintenance: false,
          canvasMaxWidth: 794,
          canvasMaxWidthType: 'px',
          canvasMaxHeight: 1135,
          canvasBackgroundColor: '#edeff5',
          backgroundFxQuery: '',
        },
      },
      appId: '0d785af0-c4de-4a66-a390-dfd23146f919',
      createdAt: '2023-03-23T11:44:40.102Z',
      updatedAt: '2023-03-23T12:10:40.604Z',
    },
  },
  dataQueries: [],
  data_queries: [],
};
