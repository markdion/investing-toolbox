import { Toolbar, Typography } from "@mui/material";
import Home from "../../Home";
import { useRootReducer } from "../../providers/RootProvider";
import { calculateAllocationTotal } from "../../utils/allocationUtils";
import AmountsContainer from "../AmountsContainer";
import CategoryContainer from "../CategoryContainer";
import ContributionContainer from "../ContributionContainer";
import DistributionContainer from "../DistributionContainer";
import ResultContainer from "../ResultContainer";
import Section from "../shared/Section";

export default function Lazy() {

  const { state, dispatch } = useRootReducer();

  function isCategorySectionComplete() {
    return state.categories.size > 0 &&
      Array.from(state.categories)
        .filter(([id, category]) => category.isSuper)
        .every(([id, category]) => calculateAllocationTotal(category.allocations) === 100);
  }

  function isAccountsSectionComplete() {
    if (state.accounts.size <= 0) {
      return false;
    }
    const accountsArray = Array.from(state.accounts);
    for (let i = 0; i < accountsArray.length; i++) {
      const isAmountTotalGreaterThanZero = Object.values(accountsArray[i][1].amounts).some((amount) => amount > 0)
      if (!isAmountTotalGreaterThanZero) {
        return false;
      }
    }
    return true;
  }

  return (
    <Home body={
      <div>
        <Toolbar />
        <Typography align="left" paragraph={true}>A <b>Lazy Portfolio</b> is a collection of investments that requires very little maintenance. It's the typical passive investing strategy, for long-term investors, with time horizons of more than 10 years.</Typography>
        <Typography align="left" paragraph={true}><b>Dollar-cost averaging (DCA)</b> is an investment strategy in which an investor divides up the total amount to be invested across periodic purchases of a target asset in an effort to reduce the impact of volatility on the overall purchase. The purchases occur regardless of the asset's price and at regular intervals.</Typography>
        <Typography align="left" paragraph={true}>A common practice when using these two ideas is <b>rebalancing</b>. A person might periodically sell over-weighted (overpriced) assets and buy under-weighted ones in order to try to maintain their target allocations. This can be costly in fees and taxable gains, and you sometimes end up selling assets only to buy them again at a higher price.</Typography>
        <Typography align="left" paragraph={true}>You can avoid these issues while also being <i>even lazier</i>. Instead of adjusting your existing investments, only adjust the allocations of your DCA contributions. <b>This calculator will help you purchase under-weighted assets optimally using your contribution amount to try to get you as close as possible to your target allocations.</b></Typography>
        <Section
          headerText={"What is in your portfolio?"}
          headerSummary={state.categories.size + " categories configured"}
          isComplete={isCategorySectionComplete()}
          subHeaderText={"Define the categories you separate your investments into."}
          bodyComponent={<CategoryContainer />}
          accordionOpen={true}
        />
        <Section
          headerText={"How much is in your portfolio?"}
          headerSummary={state.accounts.size + " accounts configured"}
          isComplete={isAccountsSectionComplete()}
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
      </div>
    } />
  )

}