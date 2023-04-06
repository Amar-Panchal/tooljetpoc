/** @format */

import { Button } from '@progress/kendo-react-all';
import React from 'react';

function KendoButton({ onclick, props }) {
  console.log('kendobutton', props);
  return (
    <Button themeColor={'primary'} onClick={onclick}>
      Primary
    </Button>
  );
}

export default KendoButton;
