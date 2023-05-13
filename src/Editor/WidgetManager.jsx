/** @format */

import React, { useEffect, useState } from "react";
import { DraggableBox } from "./DraggableBox";
import Fuse from "fuse.js";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { mediaLogoList } from "./ConstantsData";

export const WidgetManager = function WidgetManager({
  componentTypes,
  zoomLevel,
  currentLayout,
  darkMode,
  templateType,
}) {
  const [filteredComponents, setFilteredComponents] = useState(componentTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  function handleSearchQueryChange(e) {
    const { value } = e.target;

    setSearchQuery(value);
    filterComponents(value);
  }

  function filterComponents(value) {
    if (value !== "") {
      const fuse = new Fuse(componentTypes, { keys: ["component"] });
      const results = fuse.search(value);
      setFilteredComponents(results.map((result) => result.item));
    } else {
      setFilteredComponents(componentTypes);
    }
  }

  function renderComponentCard(component, index) {
    return (
      <DraggableBox
        key={index}
        index={index}
        component={component}
        zoomLevel={zoomLevel}
        currentLayout={currentLayout}
      />
    );
  }

  function renderList(header, items) {
    if (isEmpty(items)) return null;
    return (
      <>
        <span className="m-1 widget-header">{header}</span>
        {items.map((component, i) => renderComponentCard(component, i))}
      </>
    );
  }

  function segregateSections() {
    if (filteredComponents.length === 0) {
      return (
        <div className="empty">
          {/* <div class="empty-img">
            <img src="./static/illustrations/undraw_printing_invoices_5r4r.svg" height="128" alt="" />
          </div> */}
          <p className="empty-title">
            {t("widgetManager.noResults", "No results found")}
          </p>
          <p
            className={`empty-subtitle ${
              darkMode ? "text-white-50" : "text-secondary"
            }`}
          >
            {t(
              "widgetManager.tryAdjustingFilterMessage",
              "Try adjusting your search or filter to find what you're looking for."
            )}
          </p>
          <button
            className="btn btn-sm btn-outline-azure mt-3"
            onClick={() => {
              setFilteredComponents(componentTypes);
              setSearchQuery("");
            }}
          >
            {t("widgetManager.clearQuery", "clear query")}
          </button>
        </div>
      );
    }

    const commonSection = {
      title: t("widgetManager.commonlyUsed", "commonly used"),
      items: [],
    };

    const reportTemplateSection = {
      title: t("widgetManager.reportTemplate", "Report Template Components "),
      items: [],
    };
    const registrationTemplateSection = {
      title: t(
        "widgetManager.registrationTemplate",
        "Registration Template Components "
      ),
      items: [],
    };
    const layoutsSection = {
      title: t("widgetManager.layouts", "layouts"),
      items: [],
    };
    const formSection = { title: t("widgetManager.forms", "forms"), items: [] };
    const integrationSection = {
      title: t("widgetManager.integrations", "integrations"),
      items: [],
    };
    const otherSection = {
      title: t("widgetManager.others", "others"),
      items: [],
    };
    const allWidgets = [];

    const commonItems = ["Text", "Image", "Divider", "VerticalDivider"];
    const registrationTemplateItems = [
      "Button",
      "Datepicker",
      "TextInput",
      "NumberInput",
      "Dropdown",
      "Checkbox",
      "Radio-button",
      "TestList",
    ];
    const reportTemplateItems = ["ReportResultTable", "DemographicField"];

    const formItems = [
      "TextInput",
      "NumberInput",
      "PasswordInput",
      "Textarea",
      "ToggleSwitch",
      "Dropdown",
      "Multiselect",
      "RichTextEditor",
      "Checkbox",
      "Radio-button",
      "Datepicker",
      "DateRangePicker",
      "FilePicker",
      "StarRating",
    ];
    const integrationItems = ["Map"];
    const layoutItems = ["Container", "Listview", "Tabs", "Modal"];

    filteredComponents.forEach((f) => {
      if (searchQuery) allWidgets.push(f);
      if (commonItems.includes(f.name)) commonSection.items.push(f);
      if (reportTemplateItems.includes(f.name))
        reportTemplateSection.items.push(f);
      if (registrationTemplateItems.includes(f.name))
        registrationTemplateSection.items.push(f);
      if (formItems.includes(f.name)) formSection.items.push(f);
      else if (integrationItems.includes(f.name))
        integrationSection.items.push(f);
      else if (layoutItems.includes(f.name)) layoutsSection.items.push(f);
      else otherSection.items.push(f);
    });

    if (allWidgets.length > 0) {
      return <>{renderList(undefined, allWidgets)}</>;
    } else {
      return (
        <>
          {renderList(commonSection.title, commonSection.items)}
          {templateType === 1 &&
            renderList(
              reportTemplateSection.title,
              reportTemplateSection.items
            )}
          {templateType === 2 &&
            renderList(
              registrationTemplateSection.title,
              registrationTemplateSection.items
            )}

          {/* {renderList(mediaLogoSection.title, mediaLogoSection.items)}
          {renderList(layoutsSection.title, layoutsSection.items)}
          {renderList(formSection.title, formSection.items)}
          {renderList(otherSection.title, otherSection.items)}
          {renderList(integrationSection.title, integrationSection.items)} */}
        </>
      );
    }
  }

  return (
    <div className="components-container mx-3">
      <div className="input-icon">
        <input
          type="text"
          className={`form-control mt-3 mb-2 ${
            darkMode && "dark-theme-placeholder"
          }`}
          placeholder={t("globals.search", "Search") + "..."}
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e)}
          data-cy="widget-search-box"
        />
      </div>
      <div className="widgets-list col-sm-12 col-lg-12 row">
        {segregateSections()}
      </div>
      <div>
        <p>Media Logos</p>
        <div>
          {mediaLogoList.map((mediaLogoList, index) => {
            const temp = {
              properties: {
                source: {
                  type: "code",
                  displayName: "URL",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                loadingState: {
                  type: "toggle",
                  displayName: "Loading state",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                alternativeText: {
                  type: "code",
                  displayName: "Alternative text",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                zoomButtons: {
                  type: "toggle",
                  displayName: "Zoom button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                rotateButton: {
                  type: "toggle",
                  displayName: "Rotate button",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
              },
              general: {
                tooltip: {
                  type: "code",
                  displayName: "Tooltip",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              others: {
                showOnDesktop: {
                  type: "toggle",
                  displayName: "Show on desktop",
                },
                showOnMobile: {
                  type: "toggle",
                  displayName: "Show on mobile",
                },
              },
              events: {
                onClick: {
                  displayName: "On click",
                },
              },
              styles: {
                borderType: {
                  type: "select",
                  displayName: "Border type",
                  options: [
                    {
                      name: "None",
                      value: "none",
                    },
                    {
                      name: "Rounded",
                      value: "rounded",
                    },
                    {
                      name: "Circle",
                      value: "rounded-circle",
                    },
                    {
                      name: "Thumbnail",
                      value: "img-thumbnail",
                    },
                  ],
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                backgroundColor: {
                  type: "color",
                  displayName: "Background color",
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
                padding: {
                  type: "code",
                  displayName: "Padding",
                  validation: {
                    schema: {
                      type: "union",
                      schemas: [
                        {
                          type: "string",
                        },
                        {
                          type: "number",
                        },
                      ],
                    },
                  },
                },
                visibility: {
                  type: "toggle",
                  displayName: "Visibility",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                disabledState: {
                  type: "toggle",
                  displayName: "Disable",
                  validation: {
                    schema: {
                      type: "boolean",
                    },
                  },
                },
                imageFit: {
                  type: "select",
                  displayName: "Image fit",
                  options: [
                    {
                      name: "fill",
                      value: "fill",
                    },
                    {
                      name: "contain",
                      value: "contain",
                    },
                    {
                      name: "cover",
                      value: "cover",
                    },
                    {
                      name: "scale-down",
                      value: "scale-down",
                    },
                  ],
                  validation: {
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              validate: true,
              generalStyles: {
                boxShadow: {
                  type: "boxShadow",
                  displayName: "Box Shadow",
                },
              },
              definition: {
                others: {
                  showOnDesktop: {
                    value: "{{true}}",
                  },
                  showOnMobile: {
                    value: "{{false}}",
                  },
                },
                events: [],
                styles: {
                  borderType: {
                    value: "none",
                  },
                  padding: {
                    value: "0",
                  },
                  visibility: {
                    value: "{{true}}",
                  },
                  disabledState: {
                    value: "{{false}}",
                  },
                  imageFit: {
                    value: "contain",
                  },
                  backgroundColor: {
                    value: "",
                  },
                },
                generalStyles: {
                  boxShadow: {
                    value: "0px 0px 0px 0px #00000040",
                  },
                },
                properties: {
                  source: {
                    value: mediaLogoList.imageUrl,
                  },
                  visible: {
                    value: "{{true}}",
                  },
                  loadingState: {
                    value: "{{false}}",
                  },
                  alternativeText: {
                    value: "",
                  },
                  zoomButtons: {
                    value: "{{false}}",
                  },
                  rotateButton: {
                    value: "{{false}}",
                  },
                },
                general: {},
                exposedVariables: {},
              },
              name: "MediaLogos",
              displayName: mediaLogoList.imageName,
              description: "Display an Logo",
              defaultSize: {
                width: 3,
                height: 100,
              },
              component: "MediaLogos",
              exposedVariables: {},
            };
            return (
              // <div draggable={true}>
              //   <img src={mediaLogoList.imageUrl} width="80px" />
              //   <p>{mediaLogoList.imageName}</p>
              // </div>
              renderComponentCard(temp, index)
            );
          })}
        </div>
      </div>
    </div>
  );
};
