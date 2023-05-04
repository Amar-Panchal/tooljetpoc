/** @format */

import React from "react";
import { Code } from "./Elements/Code";

export function renderElement(
  component,
  componentMeta,
  paramUpdated,
  dataQueries,
  param,
  paramType,
  currentState,
  components = {},
  darkMode = false
) {
  const componentDefinition = component.component.definition;
  const paramTypeDefinition = componentDefinition[paramType] || {};
  const definition = paramTypeDefinition[param] || {};

  const meta = componentMeta[paramType][param];

  return (
    <Code
      param={{ name: param, ...component.component.properties[param] }}
      definition={definition}
      dataQueries={dataQueries}
      onChange={paramUpdated}
      paramType={paramType}
      components={components}
      componentMeta={componentMeta}
      currentState={currentState}
      darkMode={darkMode}
      componentName={component.component.name || null}
      type={meta.type}
      fxActive={definition.fxActive ?? false}
      onFxPress={(active) => {
        paramUpdated(
          { name: param, ...component.component.properties[param] },
          "fxActive",
          active,
          paramType
        );
      }}
      component={component}
    />
  );
}
