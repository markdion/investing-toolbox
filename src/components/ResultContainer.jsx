import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useRootReducer } from "../providers/RootProvider";

export default function ResultContainer() {

  const { state, dispatch } = useRootReducer();

  const [contributionBreakdown, setContributionBreakdown] = useState({});

  function calculate(contribution) {
    /*Define the fractional deviation f of an asset to be a/t − 1, where t is the asset's target allocation and a is its actual portion of the portfolio.
      Calculate f for each asset. f will be negative for underweighted assets and positive for overweighted assets.
      Note that a denotes the portion relative to the final total portfolio value;
      this is obtained by adding the contribution amount to the original total portfolio value.*/
    let totalAmount = 0;
    let actualCategoriesAmounts = {};
    for (const account of state.accounts.values()) {
      for (let [categoryId, amount] of Object.entries(account.amounts)) {
        const category = state.categories.get(categoryId);
        if (!category.isSuper && !(categoryId in actualCategoriesAmounts)) {
          actualCategoriesAmounts[categoryId] = 0;
        }
        if (category.isSuper) {
          for (const allocation of category.allocations.values()) {
            actualCategoriesAmounts[allocation.categoryId] += amount * (allocation.percent / 100);
          }
        } else {
          actualCategoriesAmounts[categoryId] += amount;
        }
        totalAmount += amount;
      }
    }
    let totalAmountAfterContribution = totalAmount + contribution;
    console.log(`Actual Distribution: ${JSON.stringify(actualCategoriesAmounts)}.`);
    console.log(`Total Amount: ${totalAmount}.`);
    console.log(`Total Amount with Contribution: ${totalAmountAfterContribution}.`);
    let targetCategoriesAmounts = {};
    for (let [categoryId, percent] of Object.entries(state.distribution)) {
      targetCategoriesAmounts[categoryId] = totalAmountAfterContribution * (percent / 100);
    }
    console.log(`Target Distribution: ${JSON.stringify(targetCategoriesAmounts)}.`);

    const unit = Math.max(1, Math.trunc(contribution / 10000));

    let finalAmounts = addMoneyToLowestFractionalDeviations(actualCategoriesAmounts, targetCategoriesAmounts, contribution, unit);
    console.log(`Final Distribution: ${JSON.stringify(finalAmounts)}.`);

    const _contributionBreakdown = {};
    for (let [categoryId, amount] of Object.entries(finalAmounts)) {
      const amountToAdd = amount - actualCategoriesAmounts[categoryId];
      if (amountToAdd > 0) {
        _contributionBreakdown[categoryId] = amountToAdd;
      }
    }
    setContributionBreakdown(_contributionBreakdown);
  }

  function addMoneyToLowestFractionalDeviations(actualAmounts, targetAmounts, remainingContribution, unit) {
    /*Add money to the asset(s) with least f until they are tied with the asset(s) with the next-least f.
      The money added to each asset must be proportional to that asset's target allocation so that the minimum f's increase in synchrony.
      Repeat this until the contribution amount is exhausted. If the assets are pre-sorted according to f,
      this process can be implemented such that its running time increases linearly with the number of assets.*/
    let clonedActualAmounts = {...actualAmounts};
    let fractionalDeviations = calculateFractionalDeviations(clonedActualAmounts, targetAmounts);
    const categoryInNeed = Object.entries(fractionalDeviations).reduce(([categoryIdA, fracDevA], [categoryIdB, fracDevB]) =>
      fracDevA <= fracDevB ? [categoryIdA, fracDevA] : [categoryIdB, fracDevB]
    );
    const categoryId = categoryInNeed[0];
    if (remainingContribution <= unit) {
      clonedActualAmounts[categoryId] += remainingContribution;
      return clonedActualAmounts;
    }
    clonedActualAmounts[categoryId] += unit;
    remainingContribution -= unit;
    return addMoneyToLowestFractionalDeviations(clonedActualAmounts, targetAmounts, remainingContribution, unit);
  }

  function calculateFractionalDeviations(actualAmounts, targetAmounts) {
    let fractionalDeviations = {};
    for (let [categoryId, actual] of Object.entries(actualAmounts)) {
      const target = targetAmounts[categoryId];
      fractionalDeviations[categoryId] = (actual / target) - 1;
    }
    // console.log(`Fractional Deviations: ${JSON.stringify(fractionalDeviations)}.`);
    return fractionalDeviations;
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "3rem",
      margin: "1rem 0 0 0",
      width: "100%"
    }}>
      <Button
        sx={{ margin: "1rem 0", width: "fit-content" }}
        variant="contained"
        color="secondary"
        onClick={() => calculate(state.contribution)}>
        Calculate
      </Button>
      {contributionBreakdown &&
        Object.entries(contributionBreakdown).map(([categoryId, amountToAdd], index) => (
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "1rem"
            }}
            key={categoryId}
          >
            <Typography variant="h5" width="20%" align="left">{state.categories.get(categoryId).name}</Typography>
            <Typography variant="h5" align="left">{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amountToAdd)}</Typography>
          </Box>
        ))
      }
    </Box>
  );
}