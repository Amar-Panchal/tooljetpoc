/** @format */

import "@/_styles/left-sidebar.scss";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";

import { LeftSidebarInspector } from "./SidebarInspector";
import { LeftSidebarDataSources } from "./SidebarDatasources";
import { DarkModeToggle } from "../../_components/DarkModeToggle";
import useRouter from "../../_hooks/use-router";
import { LeftSidebarDebugger } from "./SidebarDebugger";
import { LeftSidebarComment } from "./SidebarComment";
import LeftSidebarPageSelector from "./SidebarPageSelector";
import { ConfirmDialog } from "@/_components";
import config from "config";

export const LeftSidebar = forwardRef((props, ref) => {
  const router = useRouter();
  const {
    appId,
    switchDarkMode,
    showComments,
    darkMode = false,
    components,
    toggleComments,
    dataSources = [],
    dataSourcesChanged,
    dataQueriesChanged,
    errorLogs,
    appVersionsId,
    debuggerActions,
    currentState,
    appDefinition,
    setSelectedComponent,
    removeComponent,
    runQuery,
    currentPageId,
    addNewPage,
    switchPage,
    deletePage,
    renamePage,
    hidePage,
    unHidePage,
    updateHomePage,
    updatePageHandle,
    showHideViewerNavigationControls,
    updateOnSortingPages,
    updateOnPageLoadEvents,
    apps,
    dataQueries,
    clonePage,
    queryPanelHeight,
  } = props;
  const [selectedSidebarItem, setSelectedSidebarItem] = useState();
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showDataSourceManagerModal, toggleDataSourceManagerModal] =
    useState(false);
  const [popoverContentHeight, setPopoverContentHeight] =
    useState(queryPanelHeight);
  useEffect(() => {
    popoverContentHeight !== queryPanelHeight &&
      setPopoverContentHeight(queryPanelHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPanelHeight]);

  useImperativeHandle(ref, () => ({
    dataSourceModalToggleStateHandler() {
      toggleDataSourceManagerModal(true);
    },
  }));

  const handleSelectedSidebarItem = (item) => {
    if (item === selectedSidebarItem) {
      setSelectedSidebarItem(null);
    } else {
      setSelectedSidebarItem(item);
    }
  };

  return (
    <div
      className="left-sidebar"
      data-cy="left-sidebar-inspector"
      style={{ width: "50px" }}
    ></div>
  );
});
