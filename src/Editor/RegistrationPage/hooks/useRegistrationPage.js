/** @format */
import  { useEffect, useState } from "react";
import axios from "axios";


function useRegistrationPage() {
  const [componentsToRender, setComponentsToRender] = useState([]);
  const [RegistrationPageFormData, setRegistrationPageFormData] = useState({});

  const getReportTemplate = async () => {
    await axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate?ReportTemplateId=43"
      )
      .then((response) => {
        let data = JSON.parse(response?.data?.resultData[0]?.reportValues);
        Object.keys(data?.pages).map((key) => {
          data = data?.pages[key]?.components;
        });
        createJsonFromTemplate(data);
      })

      .catch((error) => console.log("error", error));
  };

  function createJsonFromTemplate(data) {
    const temp = [];

    Object.keys(data)?.map((key) => {
      data[key].component.layouts = data[key].layouts;
      temp.push(data[key].component);
    });

    setComponentsToRender(temp);
  }
  useEffect(() => {
    getReportTemplate();
  }, []);

  return {
    componentsToRender,
    RegistrationPageFormData,
    setRegistrationPageFormData,
  };
}

export default useRegistrationPage;
