/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextInput } from '../Components/TextInput';
import KendoInput from './Components/KendoInput';
import KendoButton from './Components/KendoButton';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { DateInput } from '@progress/kendo-react-all';

function RegistrationPage() {
  const [componentsToRender, setComponentsToRender] = useState([]);
  const [RegistrationPageFormData, setRegistrationPageFormData] = useState({});

  const getReportTemplate = async () => {
    await axios
      .get(
        'https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=43'
      )
      .then((response) => {
        let data = JSON.parse(response?.data?.resultData[0]?.reportValues);

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
    let componentType = component.component;

    switch (componentType) {
      case 'TextInput':
        return (
          <KendoInput
            props={component}
            value={RegistrationPageFormData[component.name]}
            onChange={(e) =>
              setRegistrationPageFormData({
                ...RegistrationPageFormData,
                [component.name]: e.target.value,
              })
            }
          />
        );
      case 'Button':
        return (
          <KendoButton
            onclick={() => {
              console.log(RegistrationPageFormData);
              alert(JSON.stringify(RegistrationPageFormData));
              window.location.reload();
            }}
            props={component}
          />
        );
    }
  }
  useEffect(() => {
    getReportTemplate();
  }, []);

  return (
    <div style={{ padding: '100px' }}>
      <div>
        <h1>Registration Form </h1>
      </div>
      {componentsToRender.map((component) => {
        return renderComponent(component);
      })}

      <button onClick={() => setRegistrationPageFormData({})}>clear</button>
    </div>
  );
}

export { RegistrationPage };
