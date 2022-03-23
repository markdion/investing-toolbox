import { Box, Typography } from "@mui/material";
import { useRootReducer } from "../providers/RootProvider";
import PercentTextField from "./shared/PercentTextField";

export default function DistributionContainer() {

  const { state, dispatch } = useRootReducer();

  function getTotalDistribution() {
    let total = 0;
    Object.entries(state.distribution).forEach(([categoryId, value]) => total += value);
    return total;
  }

  function isHundredPercent() {
    return getTotalDistribution() === 100;
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
      gap: "1rem",
      width: "100%"
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1rem",
        width: "100%"
      }}>
        <Typography variant="h6" align="left" width="20%">Category</Typography>
        <Typography variant="h6" align="left" width="20%" color={isHundredPercent() ? "success.main" : "error.main"}>
          {"Total: " + getTotalDistribution()}
        </Typography>
      </Box>
      {state.categories &&
        Array.from(state.categories).filter(([id, cat]) => !cat.isSuper)
            .map(([categoryId, category], index) => (
          <Box sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              gap: "1rem"
            }}
            key={categoryId}
          >
            <Typography width="20%" align="left">{category.name}</Typography>
            <PercentTextField 
              label={"Share of Total"}
              value={state.distribution[categoryId]}
              onChange={(val) => {
                dispatch({ type: "changeDistribution", id: categoryId, amount: val });
              }}
            />
          </Box>
        ))
      }
    </Box>
  );
}