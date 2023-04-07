/** @format */

import * as React from 'react';
import { Input } from '@progress/kendo-react-inputs';

const KendoInput = ({ props, value, onChange }) => {
  const { backgroundColor, borderColor, borderRadius, textColor } =
    props.definition.styles;
  const { generalStyles, properties } = props.definition;
  console.log('valueeee in inputt chin', value);
  return (
    <div style={{ margin: '10px' }}>
      <p>
        {props.name
          .replace(/([A-Z])/g, ' $1')
          .charAt(0)
          .toUpperCase() + props.name.replace(/([A-Z])/g, ' $1').slice(1)}
      </p>
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default KendoInput;
