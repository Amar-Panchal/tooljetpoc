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
  dataQueries: [],
  data_queries: [],
};

class ViewerComponent extends React.Component {
  constructor(props) {
    super(props);
    const deviceWindowWidth = window.screen.width - 5;
    const isMobileDevice = deviceWindowWidth < 600;
    console.log("fff", props);
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
                          ? "95%"
                          : "80%",

                      marginLeft:
                        this.props.location.state.mode === "preview"
                          ? ""
                          : "150px",
                      marginTop:
                        this.props.location.state.mode === "preview"
                          ? ""
                          : "15px",

                      position: "fixed",
                      top: "50px",
                      left: "60px",
                      height: "-webkit-fill-available",
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
