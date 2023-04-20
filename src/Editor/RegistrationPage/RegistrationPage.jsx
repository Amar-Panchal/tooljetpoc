/** @format */

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "../Container";
import {
  onComponentOptionChanged,
  onComponentOptionsChanged,
  onComponentClick,
  onEvent,
  runQuery,
  computeComponentState,
} from "@/_helpers/appUtils";
import queryString from "query-string";
import { resolveReferences, stripTrailingSlash } from "@/_helpers/utils";
import { withTranslation } from "react-i18next";
import _ from "lodash";
import axios from "axios";

class RegistrationPageLauncher extends React.Component {
  constructor(props) {
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
    console.log("setStateForApp ", data);
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
    console.log("setStateForContainer ", data);
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
        },

        currentPageId: currentPage.id,
        pages: {},
      },
      () => {
        computeComponentState(
          this,
          data?.definition?.pages[currentPage.id]?.components
        ).then(async () => {
          this.setState({ initialComputationOfStateDone: true });
          console.log("Default component state computed and set");

          const { events } =
            this.state.appDefinition?.pages[this.state.currentPageId];
          for (const event of events ?? []) {
            await this.handleEvent(event.eventId, event);
          }
        });
      }
    );
  };
  /**************************************    DO not DELETE this    ******************************************** */
  // loadApplicationByVersion = () => {
  //   const temp = {
  //     definition: {},
  //   };
  //   axios
  //     .get(
  //       "https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=43"
  //     )
  //     .then((response) => {
  //       temp.definition = JSON.parse(
  //         response?.data?.resultData[0].reportValues
  //       );

  //       this.setStateForApp(temp);
  //       this.setStateForContainer(temp);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  /**************************************    DO not DELETE this        ***************************************** */

  loadApplicationByVersion = async () => {
    return await axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=43"
      )
      .then(({ data }) => {
        const { reportValues: reportValuesString } =
          data?.resultData?.[0] ?? {};

        this.setStateForApp({
          definition: JSON.parse(reportValuesString ?? "{}"),
        });
        this.setStateForContainer({
          definition: JSON.parse(reportValuesString ?? "{}"),
        });
      })
      .catch(console.error);
  };

  componentDidMount() {
    const appId = this.props.match.params.id;
    const versionId = this.props.match.params.versionId;
    this.setState({ isLoading: false });
    this.loadApplicationByVersion(appId, versionId);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.slug &&
      this.props.match.params.slug !== prevProps.match.params.slug
    ) {
      this.setState({ isLoading: true });
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

    console.log("resolvedBackgroundColor", resolvedBackgroundColor);
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
    const { appDefinition, isLoading, currentLayout } = this.state;
    return (
      <div className="viewer wrapper">
        <DndProvider backend={HTML5Backend}>
          <div className="sub-section">
            <div className="main">
              <div
                className="canvas-container align-items-center"
                style={{
                  backgroundColor: this.computeCanvasBackgroundColor(),
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
                          onComponentOptionsChanged={(component, options) =>
                            onComponentOptionsChanged(this, component, options)
                          }
                          canvasWidth={this.getCanvasWidth()}
                          currentPageId={this.state.currentPageId}
                        />
                      )}
                    </>
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

export const RegistrationPage = withTranslation()(RegistrationPageLauncher);
