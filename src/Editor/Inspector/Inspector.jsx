/** @format */

import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import { componentTypes } from "../WidgetManager/components";
import { Table } from "./Components/Table";
import { TwoColumn } from "./Components/TwoColumn";
import { ThreeColumn } from "./Components/ThreeColumn";
import { FourColumn } from "./Components/FourColumn";
import { FiveColumn } from "./Components/FiveColumn";
import { Chart } from "./Components/Chart";
import { Form } from "./Components/Form";
import { renderElement } from "./Utils";
import { toast } from "react-hot-toast";
import Select from "react-select";
import {
  validateQueryName,
  convertToKebabCase,
  resolveReferences,
} from "@/_helpers/utils";
import { ConfirmDialog } from "@/_components";
import { useHotkeys } from "react-hotkeys-hook";
import { DefaultComponent } from "./Components/DefaultComponent";
import { FilePicker } from "./Components/FilePicker";
import { Modal } from "./Components/Modal";
import { CustomComponent } from "./Components/CustomComponent";
import { Icon } from "./Components/Icon";
import useFocus from "@/_hooks/use-focus";
import Accordion from "@/_ui/Accordion";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useMounted } from "@/_hooks/use-mount";
import axios from "axios";

export const Inspector = ({
  selectedComponentId,
  componentDefinitionChanged,
  dataQueries,
  allComponents,
  currentState,
  apps,
  darkMode,
  switchSidebarTab,
  removeComponent,
  pages,
}) => {
  const component = {
    id: selectedComponentId,
    component: allComponents[selectedComponentId].component,
    layouts: allComponents[selectedComponentId].layouts,
    parent: allComponents[selectedComponentId].parent,
  };

  const [showWidgetDeleteConfirmation, setWidgetDeleteConfirmation] =
    useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tabHeight, setTabHeight] = React.useState(0);
  const componentNameRef = useRef(null);
  const [newComponentName, setNewComponentName] = useState(
    component.component.name
  );
  const [inputRef, setInputFocus] = useFocus();
  const [selectedTab, setSelectedTab] = useState("properties");
  const [InputFieldDropdown, setInputFieldDropdown] = useState([]);
  const { t } = useTranslation();
  useHotkeys("backspace", () => setWidgetDeleteConfirmation(true));
  useHotkeys("escape", () => switchSidebarTab(2));

  const [droppedComponent, setDroppedComponent] = useState();

  const componentMeta = componentTypes.find(
    (comp) => component.component.component === comp.component
  );

  const isMounted = useMounted();
  useEffect(() => {
    setDroppedComponent(component.component.component);
  }, [allComponents]);
  useEffect(() => {
    componentNameRef.current = newComponentName;
  }, [newComponentName]);

  useEffect(() => {
    getFieldMasterDropdownList();
    return () => {
      handleComponentNameChange(componentNameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateComponentName = (name) => {
    const isValid = !Object.values(allComponents)
      .map((component) => component.component.name)
      .includes(name);

    if (component.component.name === name) {
      return true;
    }
    return isValid;
  };

  function handleComponentNameChange(newName) {
    if (component.component.name === newName) return;
    if (newName.length === 0) {
      toast.error(
        t("widget.common.widgetNameEmptyError", "Widget name cannot be empty")
      );
      return setInputFocus();
    }

    if (!validateComponentName(newName)) {
      toast.error(
        t(
          "widget.common.componentNameExistsError",
          "Component name already exists"
        )
      );
      return setInputFocus();
    }

    if (validateQueryName(newName)) {
      let newComponent = { ...component };
      newComponent.component.name = newName;
      componentDefinitionChanged(newComponent);
    } else {
      toast.error(
        t(
          "widget.common.invalidWidgetName",
          "Invalid widget name. Should be unique and only include letters, numbers and underscore."
        )
      );
      setInputFocus();
    }
  }

  const getDefaultValue = (val) => {
    if (componentMeta?.definition?.defaults) {
      return componentMeta.definition.defaults.find((el) => el.type === val);
    }
    return null;
  };

  function paramUpdated(param, attr, value, paramType) {
    let newDefinition = _.cloneDeep(component.component.definition);
    let allParams = newDefinition[paramType] || {};
    const paramObject = allParams[param.name];
    if (!paramObject) {
      allParams[param.name] = {};
    }

    if (attr) {
      allParams[param.name][attr] = value;
      const defaultValue = getDefaultValue(value);
      if (param.type === "select" && defaultValue) {
        allParams[defaultValue.paramName]["value"] = defaultValue.value;
      }
      if (param.name === "secondarySignDisplay") {
        if (value === "negative") {
          newDefinition["styles"]["secondaryTextColour"]["value"] = "#EE2C4D";
        } else if (value === "positive") {
          newDefinition["styles"]["secondaryTextColour"]["value"] = "#36AF8B";
        }
      }
    } else {
      allParams[param.name] = value;
    }

    newDefinition[paramType] = allParams;

    let newComponent = _.merge(component, {
      component: {
        definition: newDefinition,
      },
    });

    componentDefinitionChanged(newComponent);
  }

  function layoutPropertyChanged(param, attr, value, paramType) {
    paramUpdated(param, attr, value, paramType);

    // User wants to show the widget on mobile devices
    if (param.name === "showOnMobile" && value === true) {
      let newComponent = {
        ...component,
      };

      const { width, height } = newComponent.layouts["desktop"];

      newComponent["layouts"] = {
        ...newComponent.layouts,
        mobile: {
          top: 100,
          left: 0,
          width: Math.min(width, 445),
          height: height,
        },
      };

      componentDefinitionChanged(newComponent);

      //  Child components should also have a mobile layout
      const childComponents = Object.keys(allComponents).filter(
        (key) => allComponents[key].parent === component.id
      );

      childComponents.forEach((componentId) => {
        let newChild = {
          id: componentId,
          ...allComponents[componentId],
        };

        const { width, height } = newChild.layouts["desktop"];

        newChild["layouts"] = {
          ...newChild.layouts,
          mobile: {
            top: 100,
            left: 0,
            width: Math.min(width, 445),
            height: height,
          },
        };

        componentDefinitionChanged(newChild);
      });
    }
  }

  function eventUpdated(event, actionId) {
    let newDefinition = { ...component.component.definition };
    newDefinition.events[event.name] = { actionId };

    let newComponent = {
      ...component,
    };

    componentDefinitionChanged(newComponent);
  }

  function eventsChanged(newEvents, isReordered = false) {
    let newDefinition;
    if (isReordered) {
      newDefinition = { ...component.component };
      newDefinition.definition.events = newEvents;
    } else {
      newDefinition = { ...component.component.definition };
      newDefinition.events = newEvents;
    }

    let newComponent = {
      ...component,
    };

    componentDefinitionChanged(newComponent);
  }

  function eventOptionUpdated(event, option, value) {
    let newDefinition = { ...component.component.definition };
    let eventDefinition = newDefinition.events[event.name] || { options: {} };

    newDefinition.events[event.name] = {
      ...eventDefinition,
      options: { ...eventDefinition.options, [option]: value },
    };

    let newComponent = {
      ...component,
    };

    componentDefinitionChanged(newComponent);
  }

  const buildGeneralStyle = () => {
    const items = [];

    items.push({
      title: `${t("widget.common.general", "General")}`,
      isOpen: true,
      children: (
        <>
          {renderElement(
            component,
            componentMeta,
            layoutPropertyChanged,
            dataQueries,
            "boxShadow",
            "generalStyles",
            currentState,
            allComponents
          )}
        </>
      ),
    });

    return <Accordion items={items} />;
  };

  const propertiesTab = isMounted && (
    <GetAccordion
      componentName={componentMeta.component}
      layoutPropertyChanged={layoutPropertyChanged}
      component={component}
      paramUpdated={paramUpdated}
      dataQueries={dataQueries}
      componentMeta={componentMeta}
      eventUpdated={eventUpdated}
      eventOptionUpdated={eventOptionUpdated}
      components={allComponents}
      currentState={currentState}
      darkMode={darkMode}
      eventsChanged={eventsChanged}
      apps={apps}
      pages={pages}
      allComponents={allComponents}
      InputFieldDropdown={InputFieldDropdown}
      newComponentName={newComponentName}
      setNewComponentName={setNewComponentName}
    />
  );

  const stylesTab = (
    <div style={{ marginBottom: "6rem" }}>
      <div className="p-3">
        <Inspector.RenderStyleOptions
          componentMeta={componentMeta}
          component={component}
          paramUpdated={paramUpdated}
          dataQueries={dataQueries}
          currentState={currentState}
          allComponents={allComponents}
        />
      </div>
      {buildGeneralStyle()}
    </div>
  );
  const getFieldMasterDropdownList = async () => {
    await axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetFieldMaster"
      )
      .then((response) => {
        let temp = [];
        response?.data?.resultData?.fieldMaster?.map((element) => {
          if (component.component.component === "DemographicField") {
            temp = response?.data?.resultData?.fieldMaster;
          } else if (component.component.component === element.componentType)
            temp.push({
              value: element.value,
              label: element.label,
              componentType: element.componentType,
            });
        });

        setInputFieldDropdown(temp);
      })
      .catch((error) => console.log("err", error));
  };

  // const handleTypeSelect = (e) => {
  //   console.log("eeeee", e);
  //   setNewComponentName(e.value);
  // };

  return (
    <div className="inspector">
      <ConfirmDialog
        show={showWidgetDeleteConfirmation}
        message={"Widget will be deleted, do you want to continue?"}
        onConfirm={() => {
          switchSidebarTab(2);
          removeComponent(component);
        }}
        onCancel={() => setWidgetDeleteConfirmation(false)}
        darkMode={darkMode}
      />
      <div>
        {/* <div className="row inspector-component-title-input-holder">
          <div className="col-1" onClick={() => switchSidebarTab(2)}>
            <div
              className="inspector-close-icon-wrapper cursor-pointer"
              data-cy={`inspector-close-icon`}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="close-svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.99931 10.9751L15.0242 16.0014L16 15.027L10.9737 10.0007L16 4.97577L15.0256 4L9.99931 9.0263L4.97439 4L4 4.97577L9.02492 10.0007L4 15.0256L4.97439 16.0014L9.99931 10.9751Z"
                  fill="#8092AC"
                />
              </svg>
            </div>
          </div>
        </div> */}
        <div style={{ padding: "16px 8px", borderRadius: 6 }}>
          <div
            className="d-flex p-1"
            style={{ background: darkMode ? "#2F3C4C" : "#ECEEF0" }}
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              className={cx("btn w-50 inspector-nav-item", {
                "bg-white": selectedTab === "properties" && !darkMode,
                "bg-black": selectedTab === "properties" && darkMode,
                "color-white": darkMode,
                "opacity-100": selectedTab === "properties",
              })}
              role="tab"
              type="button"
              aria-selected="true"
              tabIndex="0"
              onClick={() => setSelectedTab("properties")}
              data-cy={`sidebar-option-properties`}
            >
              {t("widget.common.properties", "Properties")}
            </button>
            <button
              className={cx("btn w-50 inspector-nav-item", {
                "bg-white": selectedTab === "styles",
                "bg-black": selectedTab === "styles" && darkMode,
                "color-white": darkMode,
                "opacity-100": selectedTab === "styles",
              })}
              role="tab"
              type="button"
              aria-selected="false"
              tabIndex="-1"
              onClick={() => setSelectedTab("styles")}
              data-cy={`sidebar-option-styles`}
            >
              {t("widget.common.styles", "Styles")}
            </button>
          </div>
        </div>
        <hr className="m-0" />
        {selectedTab === "properties" && propertiesTab}
        {selectedTab === "styles" && stylesTab}
      </div>

      <div className="widget-documentation-link p-2">
        <a
          href={`https://docs.tooljet.io/docs/widgets/${convertToKebabCase(
            componentMeta?.name ?? ""
          )}`}
          target="_blank"
          rel="noreferrer"
          data-cy="widget-documentation-link"
        >
          {/* <small>
            {t(
              "widget.common.documentation",
              "{{componentMeta}} documentation",
              { componentMeta: componentMeta.name }
            )}
          </small> */}
        </a>
      </div>
    </div>
  );
};

const widgetsWithStyleConditions = {
  Modal: {
    conditions: [
      {
        definition: "properties", //expecting properties or styles
        property: "useDefaultButton", //expecting a property name
        conditionStyles: [
          "triggerButtonBackgroundColor",
          "triggerButtonTextColor",
        ], //expecting an array of style definitions names
      },
    ],
  },
};

const RenderStyleOptions = ({
  componentMeta,
  component,
  paramUpdated,
  dataQueries,
  currentState,
  allComponents,
}) => {
  return Object.keys(componentMeta.styles).map((style) => {
    const conditionWidget =
      widgetsWithStyleConditions[component.component.component] ?? null;
    const condition =
      conditionWidget?.conditions.find((condition) => condition.property) ?? {};

    if (
      conditionWidget &&
      conditionWidget.conditions.find((condition) =>
        condition.conditionStyles.includes(style)
      )
    ) {
      const propertyConditon = condition?.property;
      const widgetPropertyDefinition = condition?.definition;

      return handleRenderingConditionalStyles(
        component,
        componentMeta,
        dataQueries,
        paramUpdated,
        currentState,
        allComponents,
        style,
        propertyConditon,
        component.component?.definition[widgetPropertyDefinition]
      );
    }

    return renderElement(
      component,
      componentMeta,
      paramUpdated,
      dataQueries,
      style,
      "styles",
      currentState,
      allComponents
    );
  });
};

const resolveConditionalStyle = (definition, condition, currentState) => {
  const conditionExistsInDefinition = definition[condition] ?? false;
  if (conditionExistsInDefinition) {
    return resolveReferences(
      definition[condition]?.value ?? false,
      currentState
    );
  }
};

const handleRenderingConditionalStyles = (
  component,
  componentMeta,
  dataQueries,
  paramUpdated,
  currentState,
  allComponents,
  style,
  renderingPropertyCondition,
  definition
) => {
  return resolveConditionalStyle(
    definition,
    renderingPropertyCondition,
    currentState
  )
    ? renderElement(
        component,
        componentMeta,
        paramUpdated,
        dataQueries,
        style,
        "styles",
        currentState,
        allComponents
      )
    : null;
};

const GetAccordion = React.memo(
  ({ componentName, ...restProps }) => {
    switch (componentName) {
      case "Table":
        return <Table {...restProps} />;
      case "TwoColumn":
        return <TwoColumn {...restProps} />;
      case "ThreeColumn":
        return <ThreeColumn {...restProps} />;
      case "FourColumn":
        return <FourColumn {...restProps} />;
      case "FiveColumn":
        return <FiveColumn {...restProps} />;

      case "Chart":
        return <Chart {...restProps} />;

      case "FilePicker":
        return <FilePicker {...restProps} />;

      case "Modal":
        return <Modal {...restProps} />;

      case "CustomComponent":
        return <CustomComponent {...restProps} />;

      case "Icon":
        return <Icon {...restProps} />;

      case "Form":
        return <Form {...restProps} />;

      default: {
        return <DefaultComponent {...restProps} />;
      }
    }
  },
  (prevProps, nextProps) => {
    prevProps.componentName === nextProps.componentName;
  }
);

Inspector.RenderStyleOptions = RenderStyleOptions;
