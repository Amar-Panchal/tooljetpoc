/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from '../Container';
import { ViewerNavigation } from '../Viewer/ViewerNavigation';
import {
  onComponentClick,
  onEvent,
  computeComponentState,
} from '@/_helpers/appUtils';
import { resolveReferences, stripTrailingSlash } from '@/_helpers/utils';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import Spinner from '@/_ui/Spinner';
import axios from 'axios';
import { Button } from '@progress/kendo-react-all';
import ViewerLogoIcon from '../Icons/viewer-logo.svg';

const TestResultReportComponent = (props) => {
  const refPDF = useRef();
  const canvasRef = useRef(null);
  console.log('propspropspropspropsprops', props);
  const [appDefinition, setAppDefinition] = useState({ pages: {} });
  const [components, setComponents] = useState({});
  const [componentOptions, setComponentOptions] = useState({});

  const [state, setState] = useState({
    deviceWindowWidth: window.screen.width - 5,
    currentLayout: window.screen.width < 600 ? 'mobile' : 'desktop',
    isLoading: true,
    users: null,
    currentState: {
      queries: {},
      components: {},
      globals: {
        currentUser: {},
        theme: 'light',
        urlparams: {},
        environment_variables: {},
        page: {},
      },
      variables: {},
    },
    queryConfirmationList: [],
    isAppLoaded: false,
    errorAppId: null,
    errorVersionId: null,
    errorDetails: null,
    pages: {},
    currentSidebarTab: 2,
    canvasWidth: '100%',
    currentPageId: '',
  });
  const [patientData, setPatientData] = useState({});
  const [testResult, setTestResult] = useState({});

  useEffect(() => {
    const loadApplicationByVersion = async () => {
      const id = 238;
      try {
        const response = await axios.get(
          `https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=${id}`
        );
        const temp = {
          definition: JSON.parse(response?.data?.resultData[0].reportValues),
        };
        setStateForApp(temp);
        setStateForContainer(temp);
      } catch (error) {
        console.log(error);
      }
    };

    const getPatientResultData = () => {
      const patientId = props.location.state.patientId;
      if (patientId) {
        axios
          .get(
            `https://elabnextapi-dev.azurewebsites.net/api/Result/GetResult?PatientId=${patientId}`
          )
          .then((response) => {
            const maxIdObject = response.data.resultData.resultList.reduce(
              (maxObject, currentObject) => {
                return currentObject.id > maxObject.id
                  ? currentObject
                  : maxObject;
              },
              response.data.resultData.resultList[0]
            );

            let temp = JSON.parse(maxIdObject.resultValues);
            // setState({
            //   ...state,
            //   patientData: temp.patientDetails,
            //   testResultData: temp.testResult,
            // });
            console.log('temptemp', temp);
            setPatientData(temp.patientDetails);
            setTestResult(temp.testResult);
          })
          .catch((error) => {
            console.log('errror ->GetResult', error);
          });
      }
    };

    setState({ ...state, isLoading: false });
    getPatientResultData();
    loadApplicationByVersion();
  }, []);

  const setStateForApp = (data) => {
    const copyDefinition = _.cloneDeep(data.definition);
    const pagesObj = copyDefinition?.pages || {};
    const newDefinition = { ...copyDefinition, pages: pagesObj };
    setState({
      ...state,
      app: data,
      isLoading: false,
      isAppLoaded: true,
    });
    setAppDefinition(newDefinition || { components: {} });
  };

  const setStateForContainer = async (data) => {
    let userVars = {};

    let mobileLayoutHasWidgets = false;

    if (state.currentLayout === 'mobile') {
      const currentComponents =
        data.definition.pages[data.definition.homePageId].components;
      mobileLayoutHasWidgets =
        Object.keys(currentComponents).filter(
          (componentId) => currentComponents[componentId]['layouts']['mobile']
        ).length > 0;
    }

    let queryState = {};

    const pages = Object?.entries(data?.definition?.pages).map(
      ([pageId, page]) => ({ id: pageId, ...page })
    );
    const homePageId = data.definition.homePageId;
    const startingPageHandle = '';
    const currentPageId =
      pages.filter((page) => page.handle === startingPageHandle)[0]?.id ??
      homePageId;
    const currentPage = pages.find((page) => page.id === currentPageId);

    setState(
      {
        currentSidebarTab: 2,
        currentLayout: mobileLayoutHasWidgets ? 'mobile' : 'desktop',
        canvasWidth:
          state.currentLayout === 'desktop'
            ? '100%'
            : mobileLayoutHasWidgets
            ? `${state.deviceWindowWidth}px`
            : '800px',
        selectedComponent: null,
        currentState: {
          queries: queryState,
          components: {},
          globals: {
            currentUser: userVars,
            theme: 'light',
            urlparams: '',
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
        )?.then(async () => {
          setState({ initialComputationOfStateDone: true });

          const { events } = appDefinition?.pages[state.currentPageId];
          for (const event of events ?? []) {
            await handleEvent(event.eventId, event);
          }
        });
      }
    );
  };

  const switchPage = (id, queryParams = []) => {
    if (state.currentPageId === id) return;
  };

  const changeDarkMode = (newMode) => {
    setState({
      ...state,
      currentState: {
        ...state?.currentState,
        globals: {
          ...state?.currentState?.globals,
          theme: { name: newMode ? 'dark' : 'light' },
        },
      },
      showQuerySearchField: false,
    });
  };

  const computeCanvasBackgroundColor = () => {
    const bgColor =
      (appDefinition.globalSettings?.backgroundFxQuery ||
        appDefinition.globalSettings?.canvasBackgroundColor) ??
      '#edeff5';
    const resolvedBackgroundColor = resolveReferences(
      bgColor,
      state?.currentState
    );

    return resolvedBackgroundColor;
  };

  const getCanvasWidth = () => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      return 794;
    }
    return 0;
  };
  console.log('testResult', testResult);
  const onComponentOptionsChanged = (component, options) => {
    const componentName = component.name;
    let componentData = componentOptions[componentName] || {};

    for (const option of options) {
      componentData[option[0]] = option[1];
    }

    setComponentOptions({
      ...componentOptions,
      [componentName]: componentData,
    });
  };

  const onComponentOptionChanged = (component, optionName, value) => {
    const componentName = component.name;
    let componentData = components[componentName] || {};
    componentData[optionName] = value;

    setComponents({
      ...components,
      [componentName]: componentData,
    });
  };

  const renderPDF = () => {
    return (
      <div ref={refPDF} className='real-canvas-data'>
        {testResult &&
          Object.values(testResult)?.map((item, index) => {
            const itemData = item;
            console.log('itemData', itemData);
            return (
              <div className={index !== 0 ? 'page-break' : ''}>
                <div className='viewer wrapper'>
                  {false ? (
                    <Loaders />
                  ) : (
                    <DndProvider backend={HTML5Backend}>
                      <ViewerNavigation.Header
                        appName={state.app?.name ?? null}
                        changeDarkMode={changeDarkMode}
                        darkMode={false}
                        pages={appDefinition?.pages ?? []}
                        currentPageId={
                          state?.currentPageId ?? appDefinition?.homePageId
                        }
                        switchPage={switchPage}
                        currentLayout={state.currentLayout}
                      />
                      <div
                        className='canvas-area-up'
                        ref={state.cardRef}
                        style={{
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          width: '100%',
                        }}
                      >
                        <div
                          id='canvas-area'
                          ref={canvasRef}
                          className='canvas-area canvas-container align-items-center'
                          style={{
                            width: '794px',
                            position: 'relative',
                            height: '1135px',
                            backgroundColor: computeCanvasBackgroundColor(),
                            margin: 0,
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            padding: 0,
                            overflowY: 'auto',
                            overflowX: 'auto',
                          }}
                        >
                          <>
                            {state.isLoading ? (
                              <div className='mx-auto mt-5 w-50 p-5'>
                                <center>
                                  <div
                                    className='spinner-border text-azure'
                                    role='status'
                                  ></div>
                                </center>
                              </div>
                            ) : (
                              <Container
                                appDefinition={appDefinition}
                                appDefinitionChanged={() => false} // function not relevant in viewer
                                snapToGrid={true}
                                appLoading={state.isLoading}
                                darkMode={props.darkMode}
                                onEvent={(eventName, options) =>
                                  onEvent(this, eventName, options, 'view')
                                }
                                mode='view'
                                // deviceWindowWidth={deviceWindowWidth}
                                currentLayout={state.currentLayout}
                                currentState={state?.currentState}
                                selectedComponent={state.selectedComponent}
                                onComponentClick={(id, component) => {
                                  setState({
                                    ...state,
                                    selectedComponent: {
                                      id,
                                      component,
                                    },
                                  });
                                  onComponentClick(this, id, component, 'view');
                                }}
                                onComponentOptionChanged={
                                  onComponentOptionChanged
                                }
                                onComponentOptionsChanged={
                                  onComponentOptionsChanged
                                }
                                canvasWidth={getCanvasWidth()}
                                // dataQueries={dataQueries}
                                currentPageId={state.currentPageId}
                                reportTemplateDataMap={itemData}
                                customMode={props?.location?.state?.mode}
                                parameterDetails={itemData.parameterDetails}
                                testResultData2={itemData}
                                patientData={patientData}
                              />
                            )}
                          </>
                        </div>
                      </div>
                    </DndProvider>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div ref={refPDF} className='real-canvas-data'>
      {testResult &&
        Object.values(testResult)?.map((item, index) => {
          const itemData = item;
          console.log('itemData', itemData);
          return (
            <div className={index !== 0 ? 'page-break' : ''}>
              <div className='viewer wrapper'>
                {false ? (
                  <Loaders />
                ) : (
                  <DndProvider backend={HTML5Backend}>
                    <ViewerNavigation.Header
                      appName={state.app?.name ?? null}
                      changeDarkMode={changeDarkMode}
                      darkMode={false}
                      pages={appDefinition?.pages ?? []}
                      currentPageId={
                        state?.currentPageId ?? appDefinition?.homePageId
                      }
                      switchPage={switchPage}
                      currentLayout={state.currentLayout}
                    />
                    <div
                      className='canvas-area-up'
                      ref={state.cardRef}
                      style={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        width: '100%',
                      }}
                    >
                      <div
                        id='canvas-area'
                        ref={canvasRef}
                        className='canvas-area canvas-container align-items-center'
                        style={{
                          width: '794px',
                          position: 'relative',
                          height: '1135px',
                          backgroundColor: computeCanvasBackgroundColor(),
                          margin: 0,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          padding: 0,
                          overflowY: 'auto',
                          overflowX: 'auto',
                        }}
                      >
                        <>
                          {state.isLoading ? (
                            <div className='mx-auto mt-5 w-50 p-5'>
                              <center>
                                <div
                                  className='spinner-border text-azure'
                                  role='status'
                                ></div>
                              </center>
                            </div>
                          ) : (
                            <Container
                              appDefinition={appDefinition}
                              appDefinitionChanged={() => false} // function not relevant in viewer
                              snapToGrid={true}
                              appLoading={state.isLoading}
                              darkMode={props.darkMode}
                              onEvent={(eventName, options) =>
                                onEvent(this, eventName, options, 'view')
                              }
                              mode='view'
                              // deviceWindowWidth={deviceWindowWidth}
                              currentLayout={state.currentLayout}
                              currentState={state.currentState}
                              selectedComponent={state.selectedComponent}
                              onComponentClick={(id, component) => {
                                setState({
                                  ...state,
                                  selectedComponent: {
                                    id,
                                    component,
                                  },
                                });
                                onComponentClick(this, id, component, 'view');
                              }}
                              onComponentOptionChanged={
                                onComponentOptionChanged
                              }
                              onComponentOptionsChanged={
                                onComponentOptionsChanged
                              }
                              canvasWidth={getCanvasWidth()}
                              // dataQueries={dataQueries}
                              currentPageId={state.currentPageId}
                              reportTemplateDataMap={itemData}
                              customMode={props?.location?.state?.mode}
                              parameterDetails={itemData.parameterDetails}
                              testResultData2={itemData}
                              patientData={patientData}
                            />
                          )}
                        </>
                      </div>
                    </div>
                  </DndProvider>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const TestResultReport = withTranslation()(TestResultReportComponent);
