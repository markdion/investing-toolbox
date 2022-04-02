import { Box, createTheme, ThemeProvider } from "@mui/material";
import AmountsContainer from "./components/AmountsContainer";
import CategoryContainer from "./components/CategoryContainer";
import ContributionContainer from "./components/ContributionContainer";
import DistributionContainer from "./components/DistributionContainer";
import ResultContainer from "./components/ResultContainer";
import Section from "./components/shared/Section";
import RootProvider from "./providers/RootProvider";

export default function Home() {

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#ff3e00',
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff'
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <RootProvider>
        <Box sx={{
          bgcolor: "background.default",
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
            bodyComponent={<DistributionContainer />}
          />
          <Section
            headerText={"How much are you contributing?"}
            subHeaderText={"Say how much you're contributing and see the optimal way to distribute your purchases across each category to move toward your distribution goal."}
            bodyComponent={<ContributionContainer />}
          />
          <Section
            headerText={"Results"}
            subHeaderText={"Below is the optimal way to distribute your contribution to work toward your distribution goals."}
            bodyComponent={<ResultContainer />}
          />
        </Box>
      </RootProvider>
    </ThemeProvider>
  );
}