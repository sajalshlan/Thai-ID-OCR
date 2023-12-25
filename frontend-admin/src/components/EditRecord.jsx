import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditRecord() {
  const [record, setRecord] = useState([]);
  const { recordId } = useParams();

  useEffect(() => {
    axios
      .get("https://thai-ocr-backend.onrender.com/record/" + recordId)
      .then((response) => setRecord(response.data.record));

    console.log(record);
  }, []);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dob, setDob] = useState();
  const [doi, setDoi] = useState();
  const [doe, setDoe] = useState();
  return (
    <div
      style={{
        paddingTop: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Edit your selected record</Typography>
      <br />

      <Card
        variant="outlined"
        style={{ width: 400, padding: 20, borderRadius: 10 }}
      >
        <TextField
          type="text"
          fullWidth={true}
          id="standard-helperText"
          label={record.firstName}
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          type="text"
          fullWidth={true}
          id="outlined-textarea"
          multiline
          label={record.lastName}
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          type="link"
          fullWidth={true}
          id="outlined-basic"
          label={record.dob}
          variant="outlined"
          onChange={(e) => setDob(e.target.value)}
        />
        <br />
        <br />
        <TextField
          type="number"
          fullWidth={true}
          id="outlined-basic"
          label={record.doi}
          variant="outlined"
          onChange={(e) => setDoi(e.target.value)}
        />
        <br />
        <br />
        <TextField
          type="number"
          fullWidth={true}
          id="outlined-basic"
          label={record.doe}
          variant="outlined"
          onChange={(e) => setDoe(e.target.value)}
        />
        <br />
        <Button
          style={{ marginTop: 15 }}
          variant="contained"
          onClick={async () => {
            const response = await axios.put(
              "https://thai-ocr-backend.onrender.com/record/" + recordId,
              {
                firstName,
                lastName,
                doi,
                dob,
                doe,
              }
            );
            console.log(response);
            alert(`record edited successfully`);
          }}
        >
          Edit Record
        </Button>
        <br />
        <br />
      </Card>
    </div>
  );
}

export default EditRecord;
