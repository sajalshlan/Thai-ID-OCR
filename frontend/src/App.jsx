import { useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

function App() {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fetchedDetails, setFetchedDetails] = useState({});
  const [previousResults, setPreviousResults] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const simulateServerRequest = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    const response = await axios.post(
      "https://thai-ocr-backend.onrender.com/createrecord",
      formData
    );
    const data = response.data.savedResponse;

    // // Update fetched details
    setFetchedDetails(data);
    console.log(fetchedDetails);

    // // Update previous results
    setPreviousResults((prevResults) => [...prevResults, data]);
  };

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid item xs={12} md={8} sx={{ display: { xs: "block", md: "flex" } }}>
        <Card sx={{ m: 2, borderRadius: 8, boxShadow: 1 }}>
          <CardHeader
            title="Upload Image"
            sx={{
              p: 6,
              fontWeight: "bold",
              tracking: "tight",
              marginBottom: "-50px",
            }}
          />
          <CardContent
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              justifyContent="center"
              spacing={1.5}
              sx={{ width: "100%", maxW: "sm" }}
            >
              <Grid item>
                <InputLabel
                  htmlFor="ocrImage"
                  sx={{ fontSize: "0.875rem", fontWeight: "bold" }}
                >
                  Select an image
                </InputLabel>
              </Grid>
              <Grid item>
                <Input
                  id="ocrImage"
                  type="file"
                  onChange={handleImageChange}
                  sx={{
                    height: 40,
                    borderRadius: 4,
                    border: 1,
                    borderColor: "rgba(0, 0, 0, 0.23)",
                    paddingLeft: 3,
                    paddingRight: 2,
                  }}
                />
              </Grid>
            </Grid>
            {previewImage && (
              <img
                src={previewImage}
                style={{ marginTop: "2rem", maxWidth: "80%" }}
              />
            )}
            <Button
              onClick={simulateServerRequest}
              sx={{
                mt: 4,
                fontSize: "0.875rem",
                fontWeight: "500",
                borderRadius: 4,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Process OCR
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ m: 2, borderRadius: 8, boxShadow: 1 }}>
          <CardHeader
            title="Fetched Details"
            sx={{
              p: 4,
              fontWeight: "bold",
              tracking: "tight",
              marginBottom: "-50px",
            }}
          />
          <CardContent sx={{ p: 4 }}>
            {fetchedDetails ? (
              <div>
                <Typography>
                  Identification Number: {fetchedDetails.identificationNumber}
                </Typography>
                <Typography>First Name: {fetchedDetails.firstName}</Typography>
                <Typography>Last Name: {fetchedDetails.lastName}</Typography>
                <Typography>Date of Birth: {fetchedDetails.dob}</Typography>
                <Typography>Date of Issue: {fetchedDetails.doi}</Typography>
                <Typography>Date of Expiry: {fetchedDetails.doe}</Typography>
              </div>
            ) : (
              <Typography>No details fetched yet.</Typography>
            )}
          </CardContent>
        </Card>
        <Card sx={{ m: 2, borderRadius: 8, boxShadow: 1 }}>
          <CardHeader
            title="Previous Results"
            sx={{
              p: 6,
              fontWeight: "bold",
              tracking: "tight",
              marginBottom: "-50px",
            }}
          />
          <CardContent sx={{ p: 4, marginBottom: "-50px" }}>
            {previousResults.length > 0 ? (
              previousResults.map((result, index) => (
                <div key={result._id} style={{ marginBottom: "50px" }}>
                  <Typography>{index + 1}</Typography>
                  <Typography>
                    Identification Number: {result.identificationNumber}
                  </Typography>
                  <Typography>First Name: {result.firstName}</Typography>
                  <Typography>Last Name: {result.lastName}</Typography>
                  <Typography>Date of Birth: {result.dob}</Typography>
                  <Typography>Date of Issue: {result.doi}</Typography>
                  <Typography>Date of Expiry: {result.doe}</Typography>
                </div>
              ))
            ) : (
              <Typography>No previous results.</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;

