/** @format */

import * as React from 'react';
import { Input } from '@progress/kendo-react-inputs';

const KendoInput = ({ props }) => {
  const { backgroundColor, borderColor, borderRadius, textColor } =
    props.definition.styles;
  const { generalStyles, properties } = props.definition;
  return (
    <Input
      id={props.name}
      style={{
        backgroundColor: backgroundColor.value,
        borderColor: borderColor.value,
        borderRadius: parseInt(borderRadius.value.slice(2, -2)),
        color: textColor.value,
        boxShadow: generalStyles.boxShadow.value,
        width: `${(props.layouts.desktop.width * 1292) / 43}px`,
        height: `${props.layouts.desktop.height}px`,
      }}
      placeholder={properties.placeholder.value}
    />
  );
};

export default KendoInput;
