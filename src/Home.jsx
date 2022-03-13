import { Box, Paper } from "@mui/material";
import CategoryContainer from "./components/CategoryContainer";


export default function Home() {

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center"
    }}>
      <Paper sx={{
        maxWidth: "95%",
        width: "1080px",
        margin: "1rem"
      }}>
        <CategoryContainer />
      </Paper>
    </Box>
  )
}