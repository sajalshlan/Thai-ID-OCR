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

function App() {
  const theme = useTheme();
  const [, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const [previousResults, setPreviousResults] = useState([]);

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid item xs={12} md={8} sx={{ display: { xs: "block", md: "flex" } }}>
        <Card sx={{ m: 2, borderRadius: 16, boxShadow: 1 }}>
          <CardHeader
            title="Upload Image"
            sx={{ p: 6, fontWeight: "bold", tracking: "tight" }}
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
                <InputLabel htmlFor="ocrImage" sx={{ fontSize: "0.875rem" }}>
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
                style={{ marginTop: "1rem", maxWidth: "100%" }}
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
        <Card sx={{ m: 2, borderRadius: 16, boxShadow: 1 }}>
          <CardHeader
            title="Fetched Details"
            sx={{ p: 6, fontWeight: "bold", tracking: "tight" }}
          />
          <CardContent sx={{ p: 4 }}>
            {fetchedDetails ? (
              <Typography>{fetchedDetails.details}</Typography>
            ) : (
              <Typography>No details fetched yet.</Typography>
            )}
          </CardContent>
        </Card>
        <Card sx={{ m: 2, borderRadius: 16, boxShadow: 1 }}>
          <CardHeader
            title="Previous Results"
            sx={{ p: 6, fontWeight: "bold", tracking: "tight" }}
          />
          <CardContent sx={{ p: 4 }}>
            {previousResults.length > 0 ? (
              previousResults.map((result) => (
                <Typography key={result.id}>{result.details}</Typography>
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

