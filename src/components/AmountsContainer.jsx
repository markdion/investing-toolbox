import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRootReducer } from "../providers/RootProvider";
import DollarTextField from "./DollarTextField";

export default function AmountsContainer() {

  const { state, dispatch } = useRootReducer();

  const onChangeAccountName = (id, name) => {
    const _accounts = new Map(state.accounts);
    if (_accounts.has(id)) {
      const _account = _accounts.get(id);
      _account.name = name;
      _accounts.set(id, _account);
      // setAccounts(_accounts);
    }
  }

  const onChangeAmount = (accountId, categoryId, amount) => {
    const _accounts = new Map(state.accounts);
    if (_accounts.has(accountId)) {
      const _account = _accounts.get(accountId);
      _account.amounts[categoryId] = amount;
      _accounts.set(accountId, _account);
      // setAccounts(_accounts);
    }
  }

  const addAccount = () => {
    const _accounts = new Map(state.accounts);
    _accounts.set(uuidv4(), {
      name: "",
      amounts: {}
    });

    // setAccounts(_accounts);
  }

  return (
    <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "1rem",
        width: "100%"
      }}
    >
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
                gap: "1rem"
              }}
              key={accountId}
            >
              <TextField
                label="Account Name"
                fullWidth
                value={account.name}
                onChange={(event) => {
                  onChangeAccountName(accountId, event.target.value);
                }}
              />
            </Box>
          ))
        }
        <Button sx={{ margin: "1rem 0", width: "fit-content" }}
          variant="contained"
          onClick={addAccount}>
          Add Account
        </Button>
      </Box>
      {state.categories &&
        Array.from(state.categories).map(([categoryId, category], index) => (
          <Box sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
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
                  width="20%"
                  value={account.amounts[categoryId]}
                  onChange={(event) => {
                    onChangeAmount(accountId, categoryId, event.target.value);
                  }}
                />
              ))
            }
          </Box>
        ))
      }
    </Box>
  );
}