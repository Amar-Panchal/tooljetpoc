/** @format */

import { Button } from '@progress/kendo-react-all';
import React from 'react';

function KendoButton({ onclick, props }) {
  return (
    <Button themeColor={'primary'} onClick={onclick}>
      {props.name}
    </Button>
  );
}

export default KendoButton;
