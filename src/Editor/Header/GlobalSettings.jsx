/** @format */

import React, { useEffect, useState } from "react";
import cx from "classnames";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { SketchPicker } from "react-color";
import { Confirm } from "../Viewer/Confirm";
import { HeaderSection } from "@/_ui/LeftSidebar";
import { LeftSidebarItem } from "../LeftSidebar/SidebarItem";
import FxButton from "../CodeBuilder/Elements/FxButton";
import { CodeHinter } from "../CodeBuilder/CodeHinter";
import { resolveReferences } from "@/_helpers/utils";
import { useTranslation } from "react-i18next";
import _ from "lodash";

const GlobalFonts = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
  "Lucida Sans Unicode",
  "Verdana Bold",
  "Helvetica Neue",
  "Century Gothic",
  "Arial Narrow",
  "Franklin Gothic Medium",
  "Arial Rounded MT Bold",
  "Gill Sans",
  "Lucida Console",
  "Cambria",
  "Calibri",
  "Candara",
  "Rockwell",
  "Optima",
  "Baskerville",
  "Verdana Italic",
  "Helvetica Bold",
  "Times",
  "Courier",
  "Geneva",
  "Monaco",
  "Brush Script MT",
  "Futura",
  "Segoe UI",
  "Arial Unicode MS",
  "Tahoma",
  "Franklin Gothic Book",
  "Lucida Grande",
  "Arial Italic",
  "Helvetica Italic",
  "Times Italic",
  "Courier Italic",
  "Verdana Bold Italic",
  "Helvetica Neue Bold",
  "Century Gothic Italic",
  // Add more font options here
];

export const GlobalSettings = ({
  globalSettings,
  globalSettingsChanged,
  darkMode,
  toggleAppMaintenance,
  is_maintenance_on,
  currentState,
}) => {
  const { t } = useTranslation();
  const {
    hideHeader,
    canvasMaxWidth,
    canvasMaxWidthType,
    canvasMaxHeight,
    canvasBackgroundColor,
    backgroundFxQuery,
  } = globalSettings;
  const [showPicker, setShowPicker] = React.useState(false);
  const [forceCodeBox, setForceCodeBox] = React.useState(true);
  const [realState, setRealState] = React.useState(currentState);
  const [showConfirmation, setConfirmationShow] = React.useState(false);
  const [selectedFont, setSelectedFont] = useState("");
  const [show, setShow] = React.useState("");

  const coverStyles = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  React.useEffect(() => {
    setRealState(currentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.components]);

  React.useEffect(() => {
    backgroundFxQuery &&
      globalSettingsChanged(
        "canvasBackgroundColor",
        resolveReferences(backgroundFxQuery, realState)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(resolveReferences(backgroundFxQuery, realState))]);
  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
    globalSettingsChanged("globalFontVariant", event.target.value);
  };
  useEffect(() => {
    setSelectedFont(globalSettings.globalFontVariant);
  }, [globalSettings.globalFontVariant]);
  const popoverContent = (
    <Popover
      id="global-settings-popover"
      className={cx({ "theme-dark": darkMode })}
    >
      <Popover.Content bsPrefix="global-settings-popover">
        <HeaderSection darkMode={darkMode}>
          <HeaderSection.PanelHeader title="Global settings" />
        </HeaderSection>
        <div className="card-body">
          <div>
            {/* <div className="d-flex mb-3">
              <span>{t('leftSidebar.Settings.hideHeader', 'Hide header for launched apps')}</span>
              <div className="ms-auto form-check form-switch position-relative">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hideHeader}
                  onChange={(e) => globalSettingsChanged('hideHeader', e.target.checked)}
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <span>{t('leftSidebar.Settings.maintenanceMode', 'Maintenance mode')}</span>
              <div className="ms-auto form-check form-switch position-relative">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={is_maintenance_on}
                  onChange={() => setConfirmationShow(true)}
                />
              </div>
            </div> */}
            <div className="d-flex mb-3">
              <span className="w-full m-auto">
                {t(
                  "leftSidebar.Settings.maxWidthOfCanvas",
                  "Max width of canvas"
                )}
              </span>
              <div className="position-relative">
                <div className="input-with-icon">
                  <input
                    data-cy="maximum-canvas-width-input-field"
                    type="text"
                    className={`form-control form-control-sm`}
                    placeholder={"0"}
                    onChange={(e) => {
                      const width = e.target.value;
                      if (!Number.isNaN(width) && width >= 0)
                        globalSettingsChanged("canvasMaxWidth", width);
                    }}
                    value={canvasMaxWidth}
                  />
                  <select
                    className="form-select"
                    aria-label="Select canvas width type"
                    onChange={(event) => {
                      const newCanvasMaxWidthType = event.currentTarget.value;
                      globalSettingsChanged(
                        "canvasMaxWidthType",
                        newCanvasMaxWidthType
                      );
                      if (newCanvasMaxWidthType === "%") {
                        globalSettingsChanged("canvasMaxWidth", 100);
                      } else if (newCanvasMaxWidthType === "px") {
                        globalSettingsChanged("canvasMaxWidth", 1292);
                      }
                    }}
                  >
                    <option value="%" selected={canvasMaxWidthType === "%"}>
                      %
                    </option>
                    <option
                      value="px"
                      selected={
                        canvasMaxWidthType === "px" ||
                        _.isUndefined(canvasMaxWidthType)
                      }
                    >
                      px
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="d-flex mb-3">
              <span className="w-full m-auto">
                {t(
                  "leftSidebar.Settings.maxHeightOfCanvas",
                  "Max height of canvas"
                )}
              </span>
              <div className="position-relative">
                <div className="input-with-icon">
                  <input
                    data-cy="maximum-canvas-height-input-field"
                    type="text"
                    className={`form-control form-control-sm maximum-canvas-height-input-field`}
                    placeholder={"0"}
                    onChange={(e) => {
                      const height = e.target.value;
                      if (!Number.isNaN(height) && height <= 2400)
                        globalSettingsChanged("canvasMaxHeight", height);
                    }}
                    value={canvasMaxHeight}
                  />
                  <span className="input-group-text">px</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="w-full">
                {t(
                  "leftSidebar.Settings.backgroundColorOfCanvas",
                  "Background color of canvas"
                )}
              </span>
              <div className="canvas-codehinter-container">
                {showPicker && (
                  <div>
                    <div
                      style={coverStyles}
                      onClick={() => setShowPicker(false)}
                    />
                    <SketchPicker
                      className="canvas-background-picker"
                      onFocus={() => setShowPicker(true)}
                      color={canvasBackgroundColor}
                      onChangeComplete={(color) => {
                        globalSettingsChanged("canvasBackgroundColor", [
                          color.hex,
                          color.rgb,
                        ]);
                        globalSettingsChanged("backgroundFxQuery", color.hex);
                      }}
                    />
                  </div>
                )}
                {forceCodeBox && (
                  <div
                    className="row mx-0 form-control form-control-sm canvas-background-holder"
                    onClick={() => setShowPicker(true)}
                  >
                    <div
                      className="col-auto"
                      style={{
                        float: "right",
                        width: "20px",
                        height: "20px",
                        backgroundColor: canvasBackgroundColor,
                        border: `0.25px solid ${
                          ["#ffffff", "#fff", "#1f2936"].includes(
                            canvasBackgroundColor
                          ) && "#c5c8c9"
                        }`,
                      }}
                    ></div>
                    <div className="col">{canvasBackgroundColor}</div>
                  </div>
                )}
                <div
                  className={`${!forceCodeBox && "hinter-canvas-input"} ${
                    !darkMode && "hinter-canvas-input-light"
                  } `}
                >
                  {!forceCodeBox && (
                    <CodeHinter
                      currentState={realState}
                      initialValue={
                        backgroundFxQuery
                          ? backgroundFxQuery
                          : canvasBackgroundColor
                      }
                      value={
                        backgroundFxQuery
                          ? backgroundFxQuery
                          : canvasBackgroundColor
                      }
                      theme={darkMode ? "monokai" : "duotone-light"}
                      mode="javascript"
                      className="canvas-hinter-wrap"
                      lineNumbers={false}
                      onChange={(color) => {
                        globalSettingsChanged(
                          "canvasBackgroundColor",
                          resolveReferences(color, realState)
                        );
                        globalSettingsChanged("backgroundFxQuery", color);
                      }}
                    />
                  )}
                  <div
                    className={`fx-canvas ${!darkMode && "fx-canvas-light"} `}
                  >
                    <FxButton
                      active={!forceCodeBox ? true : false}
                      onPress={() => {
                        setForceCodeBox(!forceCodeBox);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex mb-3 align-items-center"
              style={{ marginTop: "10px" }}
            >
              <span className="w-full">Global Font</span>
              <div className="input-with-icon">
                <select
                  style={{
                    border: "1px solid #dadcde",
                    width: "150px",
                    height: "30px",
                  }}
                  value={selectedFont}
                  onChange={handleFontChange}
                >
                  {GlobalFonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}

                  {/* <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option> */}
                </select>
              </div>
              {/* <select>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select> */}
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Confirm
        show={showConfirmation}
        message={
          is_maintenance_on
            ? "Users will now be able to launch the released version of this app, do you wish to continue?"
            : "Users will not be able to launch the app until maintenance mode is turned off, do you wish to continue?"
        }
        onConfirm={() => toggleAppMaintenance()}
        onCancel={() => setConfirmationShow(false)}
        darkMode={darkMode}
      />
      <OverlayTrigger
        onToggle={(show) => {
          if (show) setShow("settings");
          else setShow("");
        }}
        rootClose
        trigger="click"
        placement="bottom"
        overlay={popoverContent}
        containerPadding={50}
      >
        <LeftSidebarItem
          // selectedSidebarItem={show}
          icon="settings"
          className={cx(`cursor-pointer sidebar-global-settings`)}
          tip="Settings"
        />
      </OverlayTrigger>
    </>
  );
};
