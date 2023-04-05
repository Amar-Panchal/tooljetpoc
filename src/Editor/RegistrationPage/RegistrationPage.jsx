/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextInput } from '../Components/TextInput';
import KendoInput from './Components/KendoInput';
import KendoButton from './Components/KendoButton';

function RegistrationPage() {
  const [componentsToRender, setComponentsToRender] = useState([]);

  const getReportTemplate = async () => {
    await axios
      .get(
        'https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=43'
      )
      .then((response) => {
        let data = JSON.parse(response?.data?.resultData[0]?.reportValues);
        console.log('object', data);
        Object.keys(data?.pages).map((key) => {
          data = data?.pages[key].components;
        });
        createJsonFromTemplate(data);
      })

      .catch((error) => console.log('error', error));
  };

  function createJsonFromTemplate(data) {
    const temp = [];

    Object.keys(data).map((key) => {
      data[key].component.layouts = data[key].layouts;
      temp.push(data[key].component);
    });

    setComponentsToRender(temp);
  }

  function renderComponent(component) {
    let tem = component.component;

    switch (tem) {
      case 'TextInput':
        return <KendoInput props={component} />;
      case 'Text':
        return <h1>label</h1>;
    }
  }

  useEffect(() => {
    getReportTemplate();
  }, []);

  return (
    <div>
      {componentsToRender.map((component) => {
        return renderComponent(component);
      })}
    </div>
  );
}

export { RegistrationPage };
