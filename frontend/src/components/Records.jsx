/* eslint-disable react/prop-types */
import { Card, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Records() {
  const [records, setRecords] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetch("https://thai-ocr-backend.onrender.com/records", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.records);

        setRecords(data.records);
        console.log(data.records[0]);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };

  const filteredRecords = records.filter((record) => {
    const searchValue = searchKey.toLowerCase();
    return (
      record.identificationNumber.toLowerCase().includes(searchValue) ||
      record.firstName.toLowerCase().includes(searchValue) ||
      record.lastName.toLowerCase().includes(searchValue) ||
      record.dob.toLowerCase().includes(searchValue) ||
      record.doi.toLowerCase().includes(searchValue) ||
      record.doe.toLowerCase().includes(searchValue)
    );
  });

  if (!records) return <div>Loading...</div>;

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchKey}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          paddingTop: "30px",
        }}
      >
        {filteredRecords.map((record) => {
          return <CourseComponent key={record._id} record={record} />;
        })}
      </div>
    </div>
  );
}

const CourseComponent = (props) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "25px",
        minWidth: 280,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6">
        Identificaton Number: {props.record.identificationNumber}
      </Typography>
      <br />
      <Typography variant="subtitle1">
        First Name: {props.record.firstName}
      </Typography>
      <Typography variant="subtitle1">
        Last Name: {props.record.lastName}
      </Typography>
      <Typography variant="subtitle1">
        Date of Birth: {props.record.dob}
      </Typography>
      <Typography variant="subtitle1">
        Date of Issue: {props.record.doi}
      </Typography>
      <Typography variant="subtitle1">
        Date of Expiry: {props.record.doe}
      </Typography>
      <br />
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <EditIcon
          onClick={async () => {
            navigate(`/record/${props.record._id}`);
          }}
        />
        <br />
        <DeleteIcon
          onClick={async () => {
            fetch(
              "https://thai-ocr-backend.onrender.com/record/" +
                props.record._id,
              {
                method: "DELETE",
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                alert(`record deleted successfully`);
                window.location.reload(false);
              });
          }}
        />
      </div>
    </Card>
  );
};

export default Records;
