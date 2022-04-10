import { AutoGraph } from "@mui/icons-material";
import { AppBar, Box, createTheme, Icon, ThemeProvider, Toolbar, Typography } from "@mui/material";
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
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          pt: 2,
          pb: 4
        }}>
          <AppBar position="absolute">
            <Toolbar>
              <AutoGraph color="secondary" sx={{ fontSize: 35, marginRight: "1rem" }} />
              <Typography variant="h5" color="inherit" noWrap>Lazy Portfolio Calculator</Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Box sx={{
            width: "60%"
          }}>
            <Typography align="left" paragraph="true">A <b>Lazy Portfolio</b> is a collection of investments that requires very little maintenance. It's the typical passive investing strategy, for long-term investors, with time horizons of more than 10 years.</Typography>
            <Typography align="left" paragraph="true"><b>Dollar-cost averaging (DCA)</b> is an investment strategy in which an investor divides up the total amount to be invested across periodic purchases of a target asset in an effort to reduce the impact of volatility on the overall purchase. The purchases occur regardless of the asset's price and at regular intervals.</Typography>
            <Typography align="left" paragraph="true">A common practice when using these two ideas is <b>rebalancing</b>. A person might periodically sell over-weighted (overpriced) assets and buy under-weighted ones in order to try to maintain their target allocations. This can be costly in fees and taxable gains, and you sometimes end up selling assets only to buy them again at a higher price.</Typography>
            <Typography align="left" paragraph="true">You can avoid these issues while also being <i>even lazier</i>. Instead of adjusting your existing investments, only adjust the allocations of your DCA contributions. <b>This calculator will help you purchase under-weighted assets optimally using your contribution amount to try to get you as close as possible to your target allocations.</b></Typography>
          </Box>
          <Section
            headerText={"What is in your portfolio?"}
            subHeaderText={"Define the categories you separate your investments into."}
            bodyComponent={<CategoryContainer />}
            accordionOpen={true}
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