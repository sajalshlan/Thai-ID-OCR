/* eslint-disable react/prop-types */
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Records() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/records", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecords(data.records);
      });
  }, []);

  if (!records) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      {records.map((record) => {
        return <CourseComponent key={record.id} record={record} />;
      })}
    </div>
  );
}

const CourseComponent = (props) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "15px",
        minWidth: 280,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5">{props.record.identificationNumber}</Typography>
      <Typography variant="subtitle1">{props.record.firstName}</Typography>
      <Typography variant="subtitle1">{props.record.lastName}</Typography>
      <Typography variant="subtitle1">{props.record.dob}</Typography>
      <Typography variant="subtitle1">{props.record.doi}</Typography>
      <Typography variant="subtitle1">{props.record.doe}</Typography>
      <br />
      <EditIcon
        onClick={async () => {
          console.log("hi");
          navigate(`/records/${props.record.id}`);
        }}
      />
      <br />
      <DeleteIcon
        onClick={async () => {
          console.log("hi");
          navigate(`/records/${props.record.id}`);
        }}
      />
    </Card>
  );
};

export default Records;
