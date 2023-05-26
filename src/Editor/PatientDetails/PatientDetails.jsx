/** @format */

import React, { useEffect, useState } from "react";
import "./PatientDetails.css";
import { Grid, GridColumn } from "@progress/kendo-react-all";
import { process } from "@progress/kendo-data-query";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Confirm } from "../Viewer/Confirm";
import { Button } from "react-bootstrap";
import ConfigurationModal from "./ConfigurationModal";

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 8,
  skip: 0,
};

function PatientDetails() {
  const [PatientDetailsList, setPatientDetailsList] = useState([]);
  const [dataState, setDataState] = useState(initialDataState);
  const [keysForGrid, setKeysForGrid] = useState([]);
  const [fieldMasterList, setFieldMasterList] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const history = useHistory();
  // console.log("keysForGrid", keysForGrid);
  useEffect(() => {
    setSelectedArray(keysForGrid);
  }, [keysForGrid]);
  function getPatientDetailsList() {
    axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/PatientRegistration/GetPatientRegistration"
      )
      .then((response) => {
        setPatientDetailsList(
          response.data.resultData.patientList.map((patient) => {
            const temp = JSON.parse(patient.patientDescription);
            temp.patientId = patient?.patientId;
            return temp;
          })
        );
      })
      .catch((error) => {
        console.log("error -> getPatientDetailsList", error);
      });
    axios
      .get(
        "https://elabnextapi-dev.azurewebsites.net/api/ReportSetup/GetFieldMaster        "
      )
      .then((response) => {
        setFieldMasterList(response.data.resultData.fieldMaster);
      })
      .catch((error) => {
        console.log("error -> getPatientDetailsList", error);
      });
  }
  console.log("selectedArray", selectedArray);
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

  const createGridColumn = (field) => {
    console.log("ffff", field.componentType);
    switch (field.componentType) {
      case "TextInput":
        return <GridColumn field={field.value} title={field.label} />;
      case "Datepicker":
        return (
          <GridColumn
            field={field.value}
            title={field.label}
            cell={(props) => {
              const today = new Date(props.dataItem[field.value]);

              const formattedToday = props.dataItem[field.value]
                ? today.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "Date Not Entered";

              return <td> {formattedToday} </td>;
            }}
          />
        );
      case "DropDown":
        return (
          <GridColumn
            field={field.value}
            title={field.label}
            cell={(props) => {
              return <td>{props.dataItem[field.value]?.label}</td>;
            }}
          />
        );
      case "RadioButton":
        return (
          <GridColumn
            field={field.value}
            title={field.label}
            cell={(props) => {
              return <td>{props.dataItem[field.value]?.name}</td>;
            }}
          />
        );

      default:
        return <GridColumn field={field.value} title={field.label} />;
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;

    if (value) {
      setSelectedArray((prevArray) => {
        const newArray = [...prevArray];
        const index = newArray.indexOf(name);
        if (index !== -1) {
          newArray.splice(index, 1);
        }
        newArray.unshift(name);
        return newArray;
      });
    } else {
      setSelectedArray((prevArray) =>
        prevArray.filter((element) => element !== name)
      );
    }

    // if (value) {
    //   setSelectedArray((prevArray) => [...prevArray, name]);
    // } else {
    //   setSelectedArray((prevArray) =>
    //     prevArray.filter((element) => element !== name)
    //   );
    // }
  };
  const createRows = () => {
    const rows = [];
    for (let i = 0; i < keysForGrid.length; i += 4) {
      const row = keysForGrid.slice(i, i + 4);
      rows.push(
        <tr key={i}>
          {row.map((element, index) => (
            <td key={index}>
              <Checkbox
                name={element}
                value={element}
                label={element
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (match) => match.toUpperCase())}
                // checked={selectedArray.includes(element)}
                onChange={handleCheckboxChange}
                defaultChecked={true}
              />
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div>
      <div></div>
      <Button onClick={() => setShowConfiguration(true)}>Configure</Button>
      <Grid
        resizable={true}
        pageable={true}
        sortable={true}
        filterable={true}
        reorderable={true}
        data={process(PatientDetailsList, dataState)}
        {...dataState}
        onDataStateChange={(e) => {
          setDataState(e.dataState);
        }}
        GridEvent={(event) => console.log("eve", event)}
        style={{ height: "90vh" }}
      >
        {selectedArray?.map((key) => {
          return fieldMasterList.map((field) => {
            if (field.value === key) {
              return createGridColumn(field);
            }
          });
        })}
        <GridColumn
          field="dd"
          title="Actions"
          cell={(props) => {
            return (
              <td style={{ display: "flex", gap: "10px" }}>
                {/* <button
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
                  </button> */}

                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push({
                      pathname: "/result",
                      state: props.dataItem,
                    });
                  }}
                  class="k-icon k-i-print"
                ></span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push({
                      pathname: "/registration-page",
                      state: props.dataItem,
                    });
                  }}
                  class="k-icon k-i-edit"
                ></span>
              </td>
            );
          }}
        />
      </Grid>
      <ConfigurationModal
        showModal={showConfiguration}
        title="Configure Columns"
        message="Select Which columns to display "
        handleClose={() => setShowConfiguration(!showConfiguration)}
        cancelButtonText="Cancel"
        //  handleConfirm={}
        confirmButtonText="Apply"
        createRows={createRows}
      />
    </div>
  );
}

export default PatientDetails;
