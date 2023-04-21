/** @format */

import React, { useEffect, useState } from "react";
import "./PatientDetails.css";
import { Grid, GridColumn } from "@progress/kendo-react-all";
import { process } from "@progress/kendo-data-query";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";

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
    console.log("key", key);
    switch (key) {
      case "registrationDate":
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
              const today = new Date(props.dataItem.registrationDate);
              const yyyy = today.getFullYear();
              let mm = today.getMonth() + 1; // Months start at 0!
              let dd = today.getDate();

              if (dd < 10) dd = "0" + dd;
              if (mm < 10) mm = "0" + mm;

              const formattedToday = dd + "/" + mm + "/" + yyyy;
              console.log("formattedToday", formattedToday);
              return <td>{formattedToday}</td>;
            }}
          />
        );
      case "gender":
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
              return <td>{props.dataItem.gender?.name}</td>;
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
                <td style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/",
                        state: props.dataItem,
                        target: "blank",
                      })
                    }
                  >
                    <span class="k-icon k-i-print"></span>
                  </button>
                  <button
                    onClick={() => {
                      toast.error("Hang on until we developed this");
                    }}
                  >
                    <span class="k-icon k-i-edit"></span>
                  </button>
                  <button
                    onClick={() => {
                      toast.error("Hang on until we developed this");
                    }}
                  >
                    <span class="k-icon k-i-delete"></span>
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
