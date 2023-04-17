/** @format */

import React, { useEffect, useState } from "react";
import "./PatientDetails.css";
import { Grid, GridColumn } from "@progress/kendo-react-all";
import { process } from "@progress/kendo-data-query";
import axios from "axios";

import { useHistory } from "react-router-dom";

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 5,
  skip: 0,
};
function PatientDetails() {
  const [PatientDetailsList, setPatientDetailsList] = useState([]);
  const [dataState, setDataState] = useState(initialDataState);
  const [keysForGrid, setKeysForGrid] = useState([]);
  const history = useHistory();
  function getPatientDetailsList() {
    axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/GetPatientRegistration"
      )
      .then((response) => {
        setPatientDetailsList(
          response.data.resultData.patientList.map((patient) =>
            JSON.parse(patient.patientDescription)
          )
        );
      })
      .catch((error) => {
        console.log("error -> getPatientDetailsList", error);
      });
  }

  useEffect(() => {
    getPatientDetailsList();
  }, []);

  useEffect(() => {
    const temp2 = [];
    PatientDetailsList.map((patient) => {
      const temp = Object.keys(patient);
      temp.map((key) => {
        if (!temp2.includes(key)) {
          temp2.push(key);
        }
      });

      setKeysForGrid(temp2);
    });
  }, [PatientDetailsList]);

  const createGridColumn = (key) => {
    switch (key) {
      case "dateOfBirth":
        return (
          <GridColumn
            field={key}
            title={
              key
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)
            }
            cell={(props) => {
              return (
                <td>
                  {new Date(props.dataItem.dateOfBirth).toLocaleDateString(
                    "en-GB"
                  )}
                </td>
              );
            }}
          />
        );
      case "membershipType":
        return (
          <GridColumn
            field={key}
            width={200}
            title={
              key
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)
            }
            cell={(props) => {
              return <td>{props.dataItem.membershipType?.label}</td>;
            }}
          />
        );

      case "sendSms":
        return (
          <GridColumn
            field={key}
            title={
              key
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)
            }
            cell={(props) => {
              return (
                <td>
                  <input
                    disabled={false}
                    type="checkbox"
                    checked={props.dataItem.sendSms?.isCheck}
                  />
                </td>
              );
            }}
          />
        );

      default:
        return (
          <GridColumn
            field={key}
            title={
              key
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)
            }
          />
        );
    }
  };

  return (
    <div className="patient-details-layout">
      <h1>Patient Details:</h1>
      <div>
        <Grid
          resizable={true}
          pageable={true}
          sortable={true}
          reorderable={true}
          filterable={true}
          style={{
            height: "500px",
          }}
          data={process(PatientDetailsList, dataState)}
          {...dataState}
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
        >
          {keysForGrid?.map((key) => {
            return createGridColumn(key);
          })}
          <GridColumn
            field="dd"
            title="Actions"
            cell={(props) => {
              return (
                <td>
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/",
                        state: props.dataItem,
                        target: "blank",
                      })
                    }
                  >
                    print
                  </button>
                </td>
              );
            }}
          />
        </Grid>
      </div>
    </div>
  );
}

export default PatientDetails;
