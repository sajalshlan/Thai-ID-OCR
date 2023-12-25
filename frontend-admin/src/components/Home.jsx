import { Typography } from "@mui/material";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <Typography variant="h4">OCRA</Typography>
      <Typography variant="h5">Admin Dashboard</Typography>
    </div>
  );
}

export default Home;
