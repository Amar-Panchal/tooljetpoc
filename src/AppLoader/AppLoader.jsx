import React from 'react';
import { withTranslation } from 'react-i18next';
import { Editor } from '../Editor/Editor';

const AppLoaderComponent = (props) => {
  return <Editor {...props} />;
};

export const AppLoader = withTranslation()(AppLoaderComponent);
