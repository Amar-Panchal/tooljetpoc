/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";

function ResultPage() {
  const [patientDetails, setPatientDetails] = useState([]);
  const history = useHistory();
  useEffect(() => {
    setPatientDetails(history.location.state);
  }, [history]);

  console.log("rrr", patientDetails);
  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h1>Result</h1>
      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              // flexWrap: "wrap",
              justifyContent: "space-evenly",
              padding: "20px",
              border: "1px dotted gray",
              borderRadius: "15px",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "10px" }}>
              <h1>Patient Details</h1>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <b> Patient Name :</b> {patientDetails.patientName}
              </div>
              <div>
                <b>Age:</b> {patientDetails.age}
              </div>
              <div>
                <b>Gender :</b> {patientDetails.gender?.name}
              </div>
              <div>
                <b>Membership Type</b> : {patientDetails.membershipType?.label}
              </div>
              <div>
                <b>Referred Doctor</b> : {patientDetails.referredDoctor}
              </div>
              <div>
                <b>Membership Type : </b>
                {patientDetails.membershipType?.label}
              </div>
              <div>
                <b>Membership Type :</b> {patientDetails.membershipType?.label}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",

            padding: "20px",
            border: "1px dotted gray",
            borderRadius: "15px",
          }}
        >
          <div>
            <h1>Selected Tests</h1>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-evenly",
            }}
          >
            {patientDetails?.selectedTests?.map((test) => {
              return (
                <div>
                  <Checkbox label={test} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div
            style={{
              border: "1px dotted gray",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h1>Parameters</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
