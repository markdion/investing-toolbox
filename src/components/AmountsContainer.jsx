import { Box, Button, TextField, Typography } from "@mui/material";
import { useRootReducer } from "../providers/RootProvider";
import DollarTextField from "./shared/DollarTextField";

export default function AmountsContainer() {

  const { state, dispatch } = useRootReducer();

  function percentOfTotal(categoryId) {
    let total = 0;
    let categoryTotal = 0;
    Array.from(state.accounts).forEach(([accountId, account]) => {
      Object.entries(account.amounts).forEach(([catId, amount]) => {
        total += amount;
        if (catId === categoryId) {
          categoryTotal += amount;
        }
      });
    });
    if (total === 0) {
      return "0.00%";
    }
    return (categoryTotal / total * 100).toFixed(2).toString() + "%";
  };

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
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "20%"
        }}>
          <Button sx={{ margin: "1rem 0", width: "fit-content" }}
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch({ type: 'addAccount' });
            }}>
            Add Account
          </Button>
        </Box>
        {state.accounts &&
          Array.from(state.accounts).map(([accountId, account], index) => (
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              width: "227px"
            }}
              key={accountId}>
              <Button sx={{ margin: "1rem 0", width: "fit-content" }}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch({ type: 'removeAccount', accountId});
                }}>
                Remove
              </Button>
            </Box>
          ))
        }
      </Box>
      <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1rem",
          width: "100%"
        }}
      >
        <Typography variant="h6" align="left" width="20%">Category</Typography>
        {state.accounts &&
          Array.from(state.accounts).map(([accountId, account], index) => (
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "1rem",
                width: "244px"
              }}
              key={accountId}
            >
              <TextField
                label="Account Name"
                fullWidth
                value={account.name}
                onChange={(event) => {
                  dispatch({ type: 'changeAccountName', id: accountId, name: event.target.value});
                }}
              />
            </Box>
          ))
        }
      </Box>
      {state.categories &&
        Array.from(state.categories).map(([categoryId, category], index) => (
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
            {state.accounts &&
              Array.from(state.accounts).map(([accountId, account], index) => (
                <DollarTextField
                  key={accountId}
                  label={"Amount"}
                  value={account.amounts[categoryId]}
                  onChange={(val) => {
                    dispatch({ type: 'changeAccountAmount', accountId, categoryId, amount: val});
                  }}
                />
              ))
            }
            <Typography width="20%" align="right">{percentOfTotal(categoryId)}</Typography>
          </Box>
        ))
      }
    </Box>
  );
}