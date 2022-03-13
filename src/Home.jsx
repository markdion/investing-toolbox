import { Box } from "@mui/material";
import CategoryContainer from "./components/CategoryContainer";
import Section from "./components/Section";


export default function Home() {

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center"
    }}>
      <Section
        headerText={"What is in your portfolio?"}
        subHeaderText={"Define the categories you separate your investments into."}
        bodyComponent={<CategoryContainer />} />
    </Box>
  )
}