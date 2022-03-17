import { Box } from "@mui/material";
import AmountsContainer from "./components/AmountsContainer";
import CategoryContainer from "./components/CategoryContainer";
import Section from "./components/Section";
import RootProvider from "./providers/RootProvider";

export default function Home() {

  return (
      <RootProvider>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}>
          <Section
            headerText={"What is in your portfolio?"}
            subHeaderText={"Define the categories you separate your investments into."}
            bodyComponent={<CategoryContainer />}
          />
          <Section
            headerText={"How much is in your portfolio?"}
            subHeaderText={"Using the categories you defined above, fill in the amounts you have in each."}
            bodyComponent={<AmountsContainer />}
          />
          <Section
            headerText={"What is your distribution goal?"}
            subHeaderText={"Define how much of each category you want in your portfolio."}
          />
        </Box>
      </RootProvider>
  );
}