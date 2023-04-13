/** @format */

import React, { useEffect, useState } from "react";
import "./PatientDetails.css";
import { Grid, GridColumn } from "@progress/kendo-react-all";
import { process } from "@progress/kendo-data-query";
import axios from "axios";

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 50,
  skip: 0,
};
function PatientDetails() {
  const [PatientDetailsList, setPatientDetailsList] = useState([]);
  const [dataState, setDataState] = useState(initialDataState);
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

  console.log("Patient data", PatientDetailsList);
  return (
    <div className="patient-details-layout">
      <h1>Patient Details:</h1>
      <div>
        <Grid
          resizable={true}
          pageable={true}
          sortable={true}
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
          <GridColumn field="patientName" title="Patient Name" />

          {/* <GridColumn field="Email" title="Email" /> */}
          <GridColumn field="Age" title="Age" />
          <GridColumn
            field="dateOfBirth"
            title="dateOfBirth"
            cell={(props) => {
              return (
                <div>
                  {new Date(props.dataItem.dateOfBirth).toLocaleDateString(
                    "en-GB"
                  )}
                </div>
              );
            }}
          />
          <GridColumn field="gender" title="gender" />
          {/* <GridColumn field="checkbox1.name" title="checkbox1" />
          <GridColumn field="checkbox2.name" title="checkbox2" /> */}
          {/* <GridColumn field="MembershipType.label" title="MembershipType" /> */}
          <GridColumn
            field="test"
            title="test"
            filterable={false}
            cell={(props) => {
              return (
                <ul>
                  {props.dataItem.test.map((test) => (
                    <li>{test}</li>
                  ))}
                </ul>
              );
            }}
          />
        </Grid>
      </div>
    </div>
  );
}

export default PatientDetails;
