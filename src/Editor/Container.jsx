/** @format */

import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import cx from 'classnames';
import { useDrop, useDragLayer } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { DraggableBox } from './DraggableBox';
import update from 'immutability-helper';
import { componentTypes } from './WidgetManager/components';
import { resolveReferences } from '@/_helpers/utils';
import useRouter from '@/_hooks/use-router';
import Comments from './Comments';
import config from 'config';
import Spinner from '@/_ui/Spinner';
import { useHotkeys } from 'react-hotkeys-hook';
const produce = require('immer').default;
import { addComponents, addNewWidgetToTheEditor } from '@/_helpers/appUtils';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Form } from '@progress/kendo-react-all';

export const Container = ({
  canvasWidth,
  canvasHeight,
  mode,
  snapToGrid,
  onComponentClick,
  onEvent,
  appDefinition,
  appDefinitionChanged,
  currentState,
  onComponentOptionChanged,
  onComponentOptionsChanged,
  appLoading,
  setSelectedComponent,
  zoomLevel,
  currentLayout,
  removeComponent,
  deviceWindowWidth,
  selectedComponents,
  darkMode,
  showComments,
  appVersionsId,
  socket,
  handleUndo,
  handleRedo,
  onComponentHover,
  hoveredComponent,
  sideBarDebugger,
  dataQueries,
  currentPageId,
  reportTemplateDataMap,
  customMode,
  patientDetailsEditData,
  testResultData2,
  patientData,
  handlePrint,
  parameterDetails,
}) => {
  const styles = {
    width: currentLayout === 'mobile' ? deviceWindowWidth : '100%',
    maxWidth: `${canvasWidth}px`,
    height: `${canvasHeight}px`,
    position: 'absolute',
    backgroundSize: `${canvasWidth / 43}px 10px`,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const components = appDefinition.pages[currentPageId]?.components ?? {};

  const [boxes, setBoxes] = useState(components);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [commentsPreviewList, setCommentsPreviewList] = useState([]);
  const [newThread, addNewThread] = useState({});
  const [isContainerFocused, setContainerFocus] = useState(false);
  const router = useRouter();
  const canvasRef = useRef(null);
  const focusedParentIdRef = useRef(undefined);
  const history = useHistory();
  const [PatientRegistrationFormData, setPatientRegistrationFormData] =
    useState({});

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'p') {
        handlePrint();
      }
    });
  }, []);

  console.log('testIdtestResultData2', currentState);

  function onSubmitPatientRegistrationFormData() {
    console.log(
      'onSubmitPatientRegistrationFormData',
      PatientRegistrationFormData
    );

    if (mode === 'view') {
      const payload = {
        patientId: history.location.state?.patientId
          ? history.location.state.patientId
          : undefined,
        patientDescription: PatientRegistrationFormData,
      };
      if (history.location.state?.patientId) {
        console.log('edit called', payload);

        axios
          .post(
            'https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/UpdatePatientRegistration',
            payload
          )
          .then(() => {
            setPatientRegistrationFormData({});
            toast.success('Updated Successfully');
            history.push({
              pathname: '/registration-page',
              state: {},
            });
            window.location.reload();
          })
          .catch((err) =>
            console.log('error saveRegistrationPageFormData', err)
          );
      } else {
        console.log('create called', payload);
        axios
          .post(
            'https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/SavePatientRegistration',
            payload
          )
          .then(() => {
            setPatientRegistrationFormData({});
            toast.success('Created Successfully');
            history.push({
              pathname: '/registration-page',
              state: {},
            });
            window.location.reload();
          })
          .catch((err) =>
            console.log('error saveRegistrationPageFormData', err)
          );
      }
    }
  }

  useHotkeys('⌘+z, control+z', () => handleUndo());
  useHotkeys('⌘+shift+z, control+shift+z', () => handleRedo());
  useHotkeys(
    '⌘+v, control+v',
    () => {
      if (isContainerFocused) {
        navigator.clipboard.readText().then((cliptext) => {
          try {
            addComponents(
              currentPageId,
              appDefinition,
              appDefinitionChanged,
              focusedParentIdRef.current,
              JSON.parse(cliptext)
            );
          } catch (err) {
            console.log(err);
          }
        });
      }
    },
    [isContainerFocused, appDefinition, focusedParentIdRef]
  );
  useEffect(() => {
    if (patientDetailsEditData)
      setPatientRegistrationFormData(patientDetailsEditData);
  }, [patientDetailsEditData]);

  console.log('firsttestResultData2', testResultData2);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        canvasRef.current.contains(e.target) ||
        document.getElementById('modal-container')?.contains(e.target)
      ) {
        const elem = e.target.closest('.real-canvas').getAttribute('id');
        if (elem === 'real-canvas') {
          focusedParentIdRef.current = undefined;
        } else {
          const parentId = elem.split('canvas-')[1];
          focusedParentIdRef.current = parentId;
        }
        if (!isContainerFocused) {
          setContainerFocus(true);
        }
      } else if (isContainerFocused) {
        setContainerFocus(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isContainerFocused, canvasRef]);

  useEffect(() => {
    setBoxes(components);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(components)]);

  const moveBox = useCallback(
    (id, layouts) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { layouts },
          },
        })
      );
    },
    [boxes]
  );

  // Dont update first time to skip
  // redundant save on app definition load
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const newDefinition = {
      ...appDefinition,
      pages: {
        ...appDefinition.pages,
        [currentPageId]: {
          ...appDefinition.pages[currentPageId],
          components: boxes,
        },
      },
    };

    appDefinitionChanged(newDefinition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxes]);

  const { draggingState } = useDragLayer((monitor) => {
    if (monitor.isDragging()) {
      if (!monitor.getItem().parent) {
        return { draggingState: true };
      } else {
        return { draggingState: false };
      }
    } else {
      return { draggingState: false };
    }
  });

  function convertXToPercentage(x, canvasWidth) {
    return (x * 100) / canvasWidth;
  }

  useEffect(() => {
    setIsDragging(draggingState);
  }, [draggingState]);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX, ItemTypes.COMMENT],
      async drop(item, monitor) {
        console.log('object', item);
        if (item.parent) {
          return;
        }

        if (item.name === 'comment') {
          const canvasBoundingRect = document
            .getElementsByClassName('real-canvas')[0]
            .getBoundingClientRect();
          const offsetFromTopOfWindow = canvasBoundingRect.top;
          const offsetFromLeftOfWindow = canvasBoundingRect.left;
          const currentOffset = monitor.getSourceClientOffset();

          const xOffset = Math.round(
            currentOffset.x +
              currentOffset.x * (1 - zoomLevel) -
              offsetFromLeftOfWindow
          );
          const y = Math.round(
            currentOffset.y +
              currentOffset.y * (1 - zoomLevel) -
              offsetFromTopOfWindow
          );

          const x = (xOffset * 100) / canvasWidth;

          const element = document.getElementById(`thread-${item.threadId}`);
          element.style.transform = `translate(${xOffset}px, ${y}px)`;
          return undefined;
        }

        const canvasBoundingRect = document
          .getElementsByClassName('real-canvas')[0]
          .getBoundingClientRect();
        const componentMeta = componentTypes.find(
          (component) => component.component === item.component.component
        );
        console.log('adding new component');

        const newComponent = addNewWidgetToTheEditor(
          componentMeta,
          monitor,
          boxes,
          canvasBoundingRect,
          item.currentLayout,
          snapToGrid,
          zoomLevel
        );

        setBoxes({
          ...boxes,
          [newComponent.id]: {
            component: newComponent.component,
            layouts: {
              ...newComponent.layout,
            },
            withDefaultChildren: newComponent.withDefaultChildren,
          },
        });

        setSelectedComponent(newComponent.id, newComponent.component);

        return undefined;
      },
    }),
    [moveBox]
  );

  function onDragStop(e, componentId, direction, currentLayout) {
    // const id = componentId ? componentId : uuidv4();

    // Get the width of the canvas
    const canvasBounds = document
      .getElementsByClassName('real-canvas')[0]
      .getBoundingClientRect();
    const canvasWidth = canvasBounds?.width;
    const nodeBounds = direction.node.getBoundingClientRect();

    // Computing the left offset
    const leftOffset = nodeBounds.x - canvasBounds.x;
    const currentLeftOffset = boxes[componentId].layouts[currentLayout].left;
    const leftDiff =
      currentLeftOffset - convertXToPercentage(leftOffset, canvasWidth);

    // Computing the top offset
    // const currentTopOffset = boxes[componentId].layouts[currentLayout].top;
    const topDiff =
      boxes[componentId].layouts[currentLayout].top -
      (nodeBounds.y - canvasBounds.y);

    let newBoxes = { ...boxes };

    for (const selectedComponent of selectedComponents) {
      newBoxes = produce(newBoxes, (draft) => {
        if (draft[selectedComponent.id]) {
          const topOffset =
            draft[selectedComponent.id].layouts[currentLayout].top;
          const leftOffset =
            draft[selectedComponent.id].layouts[currentLayout].left;

          draft[selectedComponent.id].layouts[currentLayout].top =
            topOffset - topDiff;
          draft[selectedComponent.id].layouts[currentLayout].left =
            leftOffset - leftDiff;
        }
      });
    }

    setBoxes(newBoxes);
  }

  function onResizeStop(id, e, direction, ref, d, position) {
    const deltaWidth = d.width;
    const deltaHeight = d.height;

    let { x, y } = position;

    const defaultData = {
      top: 100,
      left: 0,
      width: 445,
      height: 500,
    };

    let { left, top, width, height } =
      boxes[id]['layouts'][currentLayout] || defaultData;

    const boundingRect = document
      .getElementsByClassName('canvas-area')[0]
      .getBoundingClientRect();
    const canvasWidth = boundingRect?.width;

    width = Math.round(width + (deltaWidth * 43) / canvasWidth); // convert the width delta to percentage
    height = height + deltaHeight;

    top = y;
    left = (x * 100) / canvasWidth;

    let newBoxes = {
      ...boxes,
      [id]: {
        ...boxes[id],
        layouts: {
          ...boxes[id]['layouts'],
          [currentLayout]: {
            ...boxes[id]['layouts'][currentLayout],
            width,
            height,
            top,
            left,
          },
        },
      },
    };

    setBoxes(newBoxes);
  }

  function paramUpdated(id, param, value) {
    if (Object.keys(value).length > 0) {
      setBoxes((boxes) =>
        update(boxes, {
          [id]: {
            $merge: {
              component: {
                ...boxes[id].component,
                definition: {
                  ...boxes[id].component.definition,
                  properties: {
                    ...boxes[id].component.definition.properties,
                    [param]: value,
                  },
                },
              },
            },
          },
        })
      );
    }
  }

  React.useEffect(() => {}, [selectedComponents]);

  const handleAddThread = async (e) => {
    e.stopPropogation && e.stopPropogation();

    const x = (e.nativeEvent.offsetX * 100) / canvasWidth;

    const elementIndex = commentsPreviewList.length;
    setCommentsPreviewList([
      ...commentsPreviewList,
      {
        x: x,
        y: e.nativeEvent.offsetY,
      },
    ]);

    // Remove the temporary loader preview
    const _commentsPreviewList = [...commentsPreviewList];
    _commentsPreviewList.splice(elementIndex, 1);
    setCommentsPreviewList(_commentsPreviewList);

    // Update the threads on all connected clients using websocket
    // socket.send(
    //   JSON.stringify({
    //     event: "events",
    //     data: { message: "threads", appId: router.query.id },
    //   })
    // );

    // Update the list of threads on the current users page
  };

  // const getResultById = () => {
  //   axios
  //     .get(
  //       "https://elabnextapi-dev.azurewebsites.net/api/Result/GetResult?PatientId=73    "
  //     )
  //     .then((response) => {
  //       console.log("response", response).catch((error) => {
  //         console.log("error getResultById", error);
  //       });
  //     });
  // };

  // useEffect(() => {
  //   getResultById();
  // }, []);

  const handleAddThreadOnComponent = async (_, __, e) => {
    e.stopPropogation && e.stopPropogation();

    const canvasBoundingRect = document
      .getElementsByClassName('real-canvas')[0]
      .getBoundingClientRect();
    const offsetFromTopOfWindow = canvasBoundingRect.top;
    const offsetFromLeftOfWindow = canvasBoundingRect.left;

    let x = Math.round(
      e.screenX - 18 + e.screenX * (1 - zoomLevel) - offsetFromLeftOfWindow
    );
    const y = Math.round(
      e.screenY + 18 + e.screenY * (1 - zoomLevel) - offsetFromTopOfWindow
    );

    x = (x * 100) / canvasWidth;

    const elementIndex = commentsPreviewList.length;
    setCommentsPreviewList([
      ...commentsPreviewList,
      {
        x,
        y: y - 130,
      },
    ]);

    // Remove the temporary loader preview
    const _commentsPreviewList = [...commentsPreviewList];
    _commentsPreviewList.splice(elementIndex, 1);
    setCommentsPreviewList(_commentsPreviewList);

    // Update the threads on all connected clients using websocket
    socket.send(
      JSON.stringify({
        event: 'events',
        data: { message: 'threads', appId: router.query.id },
      })
    );

    // Update the list of threads on the current users page
  };

  if (showComments) {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // const currentUserInitials = `${currentUser.first_name?.charAt(0)}${currentUser.last_name?.charAt(0)}`;
    styles.cursor = `url("data:image/svg+xml,%3Csvg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='17' cy='17' r='15.25' fill='white' stroke='%23FCAA0D' stroke-width='2.5' opacity='0.5' /%3E%3Ctext x='10' y='20' fill='%23000' opacity='0.5' font-family='inherit' font-size='11.2' font-weight='500' color='%23656d77'%3E%3C/text%3E%3C/svg%3E%0A"), text`;
  }

  const childComponents = useMemo(() => {
    const componentWithChildren = {};
    Object.keys(components).forEach((key) => {
      const component = components[key];
      const { parent } = component;
      if (parent) {
        componentWithChildren[parent] = {
          ...componentWithChildren[parent],
          [key]: component,
        };
      }
    });
    return componentWithChildren;
  }, [components]);

  return (
    <div
      {...(config.COMMENT_FEATURE_ENABLE &&
        showComments && { onClick: handleAddThread })}
      ref={(el) => {
        canvasRef.current = el;
        drop(el);
      }}
      style={styles}
      className={cx('real-canvas', {
        'show-grid': isDragging || isResizing,
      })}
      id='real-canvas'
      data-cy='real-canvas'
    >
      {config.COMMENT_FEATURE_ENABLE && showComments && (
        <>
          <Comments
            socket={socket}
            newThread={newThread}
            appVersionsId={appVersionsId}
            canvasWidth={canvasWidth}
            currentPageId={currentPageId}
          />
          {commentsPreviewList.map((previewComment, index) => (
            <div
              key={index}
              style={{
                transform: `translate(${
                  (previewComment.x * canvasWidth) / 100
                }px, ${previewComment.y}px)`,
                position: 'absolute',
                zIndex: 2,
              }}
            >
              <label className='form-selectgroup-item comment-preview-bubble'>
                <span
                  className={cx(
                    'comment comment-preview-bubble-border cursor-move avatar avatar-sm shadow-lg bg-white avatar-rounded'
                  )}
                >
                  <Spinner />
                </span>
              </label>
            </div>
          ))}
        </>
      )}

      {Object.keys(boxes).map((key) => {
        const box = boxes[key];
        const canShowInCurrentLayout =
          box.component.definition.others[
            currentLayout === 'mobile' ? 'showOnMobile' : 'showOnDesktop'
          ].value;
        const addDefaultChildren = box.withDefaultChildren;
        if (
          !box.parent &&
          resolveReferences(canShowInCurrentLayout, currentState)
        ) {
          return (
            <DraggableBox
              className={showComments && 'pointer-events-none'}
              canvasWidth={canvasWidth}
              onComponentClick={
                config.COMMENT_FEATURE_ENABLE && showComments
                  ? handleAddThreadOnComponent
                  : onComponentClick
              }
              onEvent={onEvent}
              onComponentOptionChanged={onComponentOptionChanged}
              onComponentOptionsChanged={onComponentOptionsChanged}
              key={key}
              currentState={currentState}
              onResizeStop={onResizeStop}
              onDragStop={onDragStop}
              paramUpdated={paramUpdated}
              id={key}
              {...boxes[key]}
              mode={mode}
              resizingStatusChanged={(status) => setIsResizing(status)}
              draggingStatusChanged={(status) => setIsDragging(status)}
              inCanvas={true}
              zoomLevel={zoomLevel}
              setSelectedComponent={setSelectedComponent}
              removeComponent={removeComponent}
              currentLayout={currentLayout}
              deviceWindowWidth={deviceWindowWidth}
              isSelectedComponent={
                mode === 'edit'
                  ? selectedComponents.find((component) => component.id === key)
                  : false
              }
              darkMode={darkMode}
              onComponentHover={onComponentHover}
              hoveredComponent={hoveredComponent}
              sideBarDebugger={sideBarDebugger}
              isMultipleComponentsSelected={
                selectedComponents?.length > 1 ? true : false
              }
              dataQueries={dataQueries}
              childComponents={childComponents[key]}
              containerProps={{
                mode,
                snapToGrid,
                onComponentClick,
                onEvent,
                appDefinition,
                appDefinitionChanged,
                currentState,
                onComponentOptionChanged,
                onComponentOptionsChanged,
                appLoading,
                zoomLevel,
                setSelectedComponent,
                removeComponent,
                currentLayout,
                deviceWindowWidth,
                selectedComponents,
                darkMode,
                onComponentHover,
                hoveredComponent,
                sideBarDebugger,
                dataQueries,
                addDefaultChildren,
                currentPageId,
                childComponents,
              }}
              reportTemplateDataMap={reportTemplateDataMap}
              PatientRegistrationFormData={PatientRegistrationFormData}
              setPatientRegistrationFormData={setPatientRegistrationFormData}
              onSubmitPatientRegistrationFormData={
                onSubmitPatientRegistrationFormData
              }
              customMode={customMode}
              testResultData={testResultData2}
              patientData={patientData}
              parameterDetails={parameterDetails}
            />
          );
        }
      })}

      {Object.keys(boxes).length === 0 && !appLoading && !isDragging && (
        <div
          className='mx-auto w-50 p-5 bg-light no-components-box'
          style={{ marginTop: '10%' }}
        >
          {mode === 'view' ? (
            <div class='load'>
              <div class='one'></div>
              <div class='two'></div>
              <div class='three'></div>
            </div>
          ) : (
            <center className='text-muted'>
              You haven&apos;t added any components yet. Drag components from
              the right sidebar and drop here.
            </center>
          )}
        </div>
      )}
    </div>
  );
};
