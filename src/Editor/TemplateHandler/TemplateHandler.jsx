/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function TemplateHandler(props) {
  const history = useHistory();
  const [templateList, setTemplateList] = useState([]);
  const getReportTemplate = async () => {
    await axios
      .get(
        `https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetReportTemplate`
      )
      .then((response) => {
        // this.state.appDefinition = JSON.parse(
        //   response.data.resultData[0].reportValues
        // );

        setTemplateList(
          response.data.resultData.filter((item) => item.templateType)
        );

        // this.fetchApp();
      })

      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getReportTemplate();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <h3>Report template List</h3>
        <div>
          {templateList.map((template) => {
            return template.templateType === 1 ? (
              <li
                style={{
                  border: "1px dotted gray",
                  padding: "20px",
                  margin: "10px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  history.push({
                    pathname: "/editor",
                    state: template.reportTemplateId,
                  })
                }
              >
                {template.name}
              </li>
            ) : null;
          })}
        </div>
      </div>
      <div>
        <h3>registration template List</h3>
        <div>
          {" "}
          {templateList.map((template) => {
            return template.templateType === 2 ? (
              <li
                style={{
                  border: "1px dotted gray",
                  padding: "20px",
                  margin: "10px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  history.push({
                    pathname: "/editor",
                    state: template.reportTemplateId,
                  })
                }
              >
                {template.name}
              </li>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default TemplateHandler;
