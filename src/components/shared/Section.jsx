import { Paper, Typography } from "@mui/material";

export default function Section({
  headerText,
  subHeaderText,
  bodyComponent }) {

  return (
    <Paper sx={{

      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "flex-start",
      margin: "1rem",
      padding: "1rem",
      width: "60%"
    }}>
      <Typography variant="h5" align="left">{headerText}</Typography>
      <Typography variant="subtitle1" align="left">{subHeaderText}</Typography>
      {bodyComponent}
    </Paper>
  );
}