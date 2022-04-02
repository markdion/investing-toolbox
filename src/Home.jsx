import { AppBar, Box, createTheme, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import AmountsContainer from "./components/AmountsContainer";
import CategoryContainer from "./components/CategoryContainer";
import ContributionContainer from "./components/ContributionContainer";
import DistributionContainer from "./components/DistributionContainer";
import ResultContainer from "./components/ResultContainer";
import Section from "./components/shared/Section";
import RootProvider from "./providers/RootProvider";

export default function Home() {

  const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#bdbdbd',
          light: '#efefef',
          dark: '#8d8d8d',
          contrastText: '#000000'
        },
        secondary: {
          main: '#d50000',
          light: '#ff5131',
          dark: '#9b0000',
          contrastText: '#ffffff'
        },
        background: {
          default: grey[100],
          paper: '#ffffff'
        },
      },
    }
  )

  return (
    <ThemeProvider theme={theme}>
      <RootProvider>
        <Box sx={{
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          pt: 2,
          pb: 4
        }}>
          <AppBar position="absolute">
            <Toolbar>
              <Typography variant="h5" color="inherit" noWrap>Lazy Portfolio Calculator</Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
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
          <Typography sx={{ pt: 2 }} variant="body2" color="text.secondary" align="center">
            Made By Mark. Copyright © 2022.
          </Typography>
        </Box>
      </RootProvider>
    </ThemeProvider>
  );
}