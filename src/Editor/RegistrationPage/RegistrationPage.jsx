/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegistrationPage() {
  const [template, settemplate] = useState();

  const getReportTemplate = async () => {
    await axios
      .get(
        'https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=43'
      )
      .then((response) => {
        let data = JSON.parse(response?.data?.resultData[0]?.reportValues);
        // data = data?.pages['c3cf6dba-88d1-4527-9107-389632a95bc3']?.components;
        settemplate(data);
      })

      .catch((error) => console.log('error', error));
  };
  console.log('object', template);
  useEffect(() => {
    getReportTemplate();
  }, []);

  // useEffect(() => {
  //   Object.keys(template.pages)?.map((key) => {
  //     setRenderTemplate(template.pages[key].components);
  //   });
  // }, [template]);

  // useEffect(() => {
  //   if (renderTemplate) {
  //     Object.keys(renderTemplate)?.map((key) => {
  //       console.log(renderTemplate[key]);
  //     });
  //   }
  // }, [renderTemplate]);

  // console.log('template', renderTemplate);

  return (
    <div>
      <h1>hello</h1>
      {template?.data &&
        Object.keys(template?.data)?.map((key) => {
          console.log(template?.data[key]);
        })}
    </div>
  );
}

export { RegistrationPage };
