/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Spinner from "@/_ui/Spinner";
import CustomSpinningLoader from "../../_ui/Loader/Loader";

const emptyJSON = {
  showViewerNavigation: true,
  homePageId: "38b5f18a-1427-46f0-b218-316321712282",
  pages: {
    "38b5f18a-1427-46f0-b218-316321712282": {
      components: {},
      handle: "home",
      name: "Home",
    },
  },
  globalSettings: {
    hideHeader: false,
    appInMaintenance: false,
    canvasMaxWidth: "1320",
    canvasMaxWidthType: "px",
    canvasMaxHeight: 2400,
    canvasBackgroundColor: "#ffffff",
    backgroundFxQuery: "#ffffff",
  },
};

function TemplateHandler(props) {
  const history = useHistory();
  const [templateList, setTemplateList] = useState([]);
  const [createTemplateData, setCreateTemplateData] = useState({
    templateName: "",
    templateType: 0,
  });
  const [loading, setLoading] = useState(false);
  const getReportTemplate = async () => {
    setLoading(true);
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
        setLoading(false);

        // this.fetchApp();
      })

      .catch((error) => {
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getReportTemplate();
  }, []);

  const handleCreateTemplate = () => {
    if (createTemplateData.templateName === "")
      toast.error("template name cannot be blank");
    else if (createTemplateData.templateType === 0)
      toast.error("template type cannot be blank");
    else {
      const payload = {
        reportTemplateName: createTemplateData.templateName,
        templateType: createTemplateData.templateType,
        reportValues: emptyJSON,
        // templateId: 0,
      };
      axios
        .post(
          `https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/SaveReportTemplate`,
          payload
        )
        .then((response) => {
          history.push({
            pathname: "/editor",
            state: response.data.resultData.reportMasterData,
          });
          getReportTemplate();
        })
        .catch((error) => console.log("error handleCreateTemplate", error));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {loading ? (
        <CustomSpinningLoader />
      ) : (
        <>
          {" "}
          <div>
            <h1>create template</h1>
            <input
              placeholder="template Name"
              onChange={(e) =>
                setCreateTemplateData({
                  ...createTemplateData,
                  templateName: e.target.value,
                })
              }
            />
            {/* <input
          placeholder="template id"
          onChange={(e) =>
            setCreateTemplateData({
              ...createTemplateData,
              templateType: e.target.value,
            })
          }
        /> */}
            <select
              id="dropdown"
              onChange={(e) =>
                setCreateTemplateData({
                  ...createTemplateData,
                  templateType: e.target.value,
                })
              }
            >
              <option value="null">Select ...</option>
              <option value="1">report</option>
              <option value="2">registration</option>
            </select>

            <button onClick={handleCreateTemplate}>create template</button>
          </div>
          <div>
            <h3>Report template List</h3>
            <div
              style={{ height: "500px", overflow: "scroll", width: "300px" }}
            >
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
                        state: template,
                      })
                    }
                  >
                    name : {template.name}
                    <br /> id: {template.reportTemplateId}
                    <br /> templateType : {template.templateType}
                    <br /> templateTypeName :{" "}
                    {template.templateType == 1 ? "report" : "registration"}
                  </li>
                ) : null;
              })}
            </div>
          </div>
          <div>
            <h3>registration template List</h3>
            <div
              style={{ height: "500px", overflow: "scroll", width: "300px" }}
            >
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
                        state: template,
                      })
                    }
                  >
                    name : {template.name}
                    <br /> id: {template.reportTemplateId}
                    <br /> templateType : {template.templateType}
                    <br /> templateTypeName :{" "}
                    {template.templateType == 1 ? "report" : "registration"}
                  </li>
                ) : null;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TemplateHandler;
