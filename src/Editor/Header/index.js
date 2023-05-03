/** @format */

import React from "react";
import { Link, useHistory } from "react-router-dom";
import AppLogo from "@/_components/AppLogo";
import { GlobalSettings } from "./GlobalSettings";
import EditAppName from "./EditAppName";
import HeaderActions from "./HeaderActions";
import RealtimeAvatars from "../RealtimeAvatars";
import { AppVersionsManager } from "../AppVersionsManager/List";
import { ManageAppUsers } from "../ManageAppUsers";
import { ReleaseVersionButton } from "../ReleaseVersionButton";
import cx from "classnames";
import config from "config";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, Input } from "@progress/kendo-react-all";
import useRouter from "../../_hooks/use-router";
import { ApiCallParams } from "../StaticApiCall";

export default function EditorHeader({
  darkMode,
  currentState,
  currentLayout,
  globalSettingsChanged,
  appDefinition,
  toggleAppMaintenance,
  editingVersion,
  showCreateVersionModalPrompt,
  app,
  appVersionPreviewLink,
  slug,
  appId,
  canUndo,
  canRedo,
  handleUndo,
  handleRedo,
  toggleCurrentLayout,
  isSaving,
  saveError,
  isVersionReleased,
  onNameChanged,
  setAppDefinitionFromVersion,
  closeCreateVersionModalPrompt,
  handleSlugChange,
  onVersionRelease,
  saveEditingVersion,
  getReportTemplate,
  reportTemplateDataMap,
  onChangeTemplateName,
  templateName,
}) {
  const { is_maintenance_on } = app;
  const payload = {
    reportTemplateId: ApiCallParams.id,
    reportTemplateName: templateName,
    reportValues: appDefinition,
    templateType: ApiCallParams.templateType,
  };

  function searchEmptyDemographicField(jsonObj, searchValue) {
    if (typeof jsonObj === "object" && jsonObj !== null) {
      for (const key in jsonObj) {
        const val = jsonObj[key];
        if (typeof val === "string" && val.includes(searchValue)) {
          return true;
        } else if (searchEmptyDemographicField(val, searchValue)) {
          return true;
        }
      }
      if (
        Array.isArray(jsonObj) &&
        jsonObj.some((val) => searchEmptyDemographicField(val, searchValue))
      ) {
        return true;
      }
    }
    return false;
  }

  const updateReportTemplate = () => {
    const tem = searchEmptyDemographicField(appDefinition, "demographicfield");
    const tem3 = searchEmptyDemographicField(
      appDefinition,
      "reportresulttable"
    );
    const tem2 = searchEmptyDemographicField(appDefinition, "testlist");
    console.log("fff", tem2);
    if (tem) toast.error("Demographic field cannot be empty");
    else if (payload.templateType === 1 && !tem3)
      toast.error("Please Add Report Result Table Component");
    else if (payload.templateType === 2 && !tem2)
      toast.error("Please Add Test List Component");
    else {
      axios
        .put(
          "https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/UpdateReportTemplate",
          payload
        )
        .then((response) => {
          toast.success("Saved Successfully");
        })
        .catch((error) => {
          console.log("sss", error);
        });
    }
  };

  return (
    <div
      className="header"
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginLeft: "60px",
        }}
      >
        Template Name :
        <Input
          onChange={onChangeTemplateName}
          value={templateName}
          placeholder="Template Name...."
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button onClick={updateReportTemplate}>Save </Button>
        <Link
          title="Preview"
          rel="noreferrer"
          data-cy="preview-link-button"
          to={{
            pathname: appVersionPreviewLink,
            state: {
              reportTemplateDataMap: reportTemplateDataMap,
              mode: "preview",
            },
          }}
        >
          <svg
            className="icon cursor-pointer w-100 h-100"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.363281"
              y="0.220703"
              width="32"
              height="32"
              rx="6"
              fill="#F0F4FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4712 16.2205C12.1364 18.9742 14.1064 20.2205 16.3646 20.2205C18.6227 20.2205 20.5927 18.9742 22.258 16.2205C20.5927 13.4669 18.6227 12.2205 16.3646 12.2205C14.1064 12.2205 12.1364 13.4669 10.4712 16.2205ZM9.1191 15.8898C10.9694 12.6519 13.3779 10.8872 16.3646 10.8872C19.3513 10.8872 21.7598 12.6519 23.6101 15.8898C23.7272 16.0947 23.7272 16.3464 23.6101 16.5513C21.7598 19.7891 19.3513 21.5539 16.3646 21.5539C13.3779 21.5539 10.9694 19.7891 9.1191 16.5513C9.00197 16.3464 9.00197 16.0947 9.1191 15.8898ZM16.3646 15.5539C15.9964 15.5539 15.6979 15.8524 15.6979 16.2205C15.6979 16.5887 15.9964 16.8872 16.3646 16.8872C16.7328 16.8872 17.0312 16.5887 17.0312 16.2205C17.0312 15.8524 16.7328 15.5539 16.3646 15.5539ZM14.3646 16.2205C14.3646 15.116 15.26 14.2205 16.3646 14.2205C17.4692 14.2205 18.3646 15.116 18.3646 16.2205C18.3646 17.3251 17.4692 18.2205 16.3646 18.2205C15.26 18.2205 14.3646 17.3251 14.3646 16.2205Z"
              fill="#3E63DD"
            />
          </svg>
        </Link>
        <div style={{ height: "30px" }}>
          <GlobalSettings
            currentState={currentState}
            globalSettingsChanged={globalSettingsChanged}
            globalSettings={appDefinition.globalSettings}
            darkMode={darkMode}
            toggleAppMaintenance={toggleAppMaintenance}
            is_maintenance_on={is_maintenance_on}
          />
        </div>
      </div>
    </div>
  );
}
