/** @format */

import React from "react";
import Accordion from "@/_ui/Accordion";
import { EventManager } from "../EventManager";
import { renderElement } from "../Utils";
import Select from "react-select";
// eslint-disable-next-line import/no-unresolved
import i18next from "i18next";
import AccordionItem from "../../../_ui/Accordion/AccordionItem";

export const DefaultComponent = ({ componentMeta, darkMode, ...restProps }) => {
  const {
    layoutPropertyChanged,
    component,
    paramUpdated,
    dataQueries,
    currentState,
    eventsChanged,
    apps,
    components,
    pages,
    InputFieldDropdown,
    newComponentName,
    setNewComponentName,
  } = restProps;

  const properties = Object.keys(componentMeta.properties);
  const events = Object.keys(componentMeta.events);
  const validations = Object.keys(componentMeta.validation || {});
  const accordionItems = baseComponentProperties(
    properties,
    events,
    component,
    componentMeta,
    layoutPropertyChanged,
    paramUpdated,
    dataQueries,
    currentState,
    eventsChanged,
    apps,
    components,
    validations,
    darkMode,
    pages
  );

  const handleTypeSelect = (e) => {
    setNewComponentName(e.value);
  };

  return (
    <div>
      <AccordionItem
        open={true}
        // key={12}
        // index={12}
        title="Mandatory Fields"
        children={
          <div>
            <div className="mb-2 field form-label">Component Name</div>
            <Select
              options={InputFieldDropdown}
              onChange={handleTypeSelect}
              value={InputFieldDropdown.filter(function (option) {
                return option.value === newComponentName;
              })}
              label="Single select"
              required
              style={{ border: "1px solid red" }}
            />
          </div>
        }
      />
      <Accordion items={accordionItems} />
    </div>
  );
};

export const baseComponentProperties = (
  properties,
  events,
  component,
  componentMeta,
  layoutPropertyChanged,
  paramUpdated,
  dataQueries,
  currentState,
  eventsChanged,
  apps,
  allComponents,
  validations,
  darkMode,
  pages
) => {
  // Add widget title to section key to filter that property section from specified widgets' settings
  const accordionFilters = {
    Properties: [],
    Events: [],
    Validation: [],
    General: ["Modal"],
    Layout: [],
  };
  let items = [];
  if (properties.length > 0) {
    items.push({
      title: `${i18next.t("widget.common.properties", "Properties")}`,
      children: properties.map((property) =>
        renderElement(
          component,
          componentMeta,
          paramUpdated,
          dataQueries,
          property,
          "properties",
          currentState,
          allComponents,
          darkMode
        )
      ),
    });
  }

  if (events.length > 0) {
    items.push({
      title: `${i18next.t("widget.common.events", "Events")}`,
      isOpen: true,
      children: (
        <EventManager
          component={component}
          componentMeta={componentMeta}
          currentState={currentState}
          dataQueries={dataQueries}
          components={allComponents}
          eventsChanged={eventsChanged}
          apps={apps}
          darkMode={darkMode}
          pages={pages}
        />
      ),
    });
  }

  if (validations.length > 0) {
    items.push({
      title: `${i18next.t("widget.common.validation", "Validation")}`,
      children: validations.map((property) =>
        renderElement(
          component,
          componentMeta,
          paramUpdated,
          dataQueries,
          property,
          "validation",
          currentState,
          allComponents,
          darkMode
        )
      ),
    });
  }

  items.push({
    title: `${i18next.t("widget.common.general", "General")}`,
    isOpen: true,
    children: (
      <>
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          "tooltip",
          "general",
          currentState,
          allComponents
        )}
      </>
    ),
  });

  items.push({
    title: `${i18next.t("widget.common.layout", "Layout")}`,
    isOpen: true,
    children: (
      <>
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          "showOnDesktop",
          "others",
          currentState,
          allComponents
        )}
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          "showOnMobile",
          "others",
          currentState,
          allComponents
        )}
      </>
    ),
  });

  return items.filter(
    (item) =>
      !(
        item.title in accordionFilters &&
        accordionFilters[item.title].includes(componentMeta.component)
      )
  );
};
