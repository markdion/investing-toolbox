import { Box } from "@mui/material";
import { useRootReducer } from "../providers/RootProvider";
import DollarTextField from "./shared/DollarTextField";

export default function ContributionContainer() {

  const { state, dispatch } = useRootReducer();

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "1rem",
      margin: "1rem 0 0 0"
    }}>
      <DollarTextField
        label={"Contribution Amount"}
        value={state.contribution}
        onChange={(val) => {
          dispatch({ type: "changeContributionAmount", amount: val })
        }}
      />
    </Box>
  );
}