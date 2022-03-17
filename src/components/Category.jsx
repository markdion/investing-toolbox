import { Clear } from "@mui/icons-material";
import { Box, Button, Card, FormControlLabel, IconButton, Switch, TextField } from "@mui/material";
import { useRootReducer } from "../providers/RootProvider";
import Allocation from "./Allocation";

export default function Category({
  category,
  categoryId,
  allCategories }) {

  const { state, dispatch } = useRootReducer();

  return (
    <Card sx={{
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "flex-start",
      margin: "1rem 0"
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}>
          <TextField
            sx={{ margin: "1rem" }}
            label="Name"
            value={category.name}
            onChange={(event) => {
              dispatch({ type: "changeCategoryName", id: categoryId, name: event.target.value });
            }}
          />
          <FormControlLabel
            sx={{ margin: "1rem" }}
            control={
              <Switch
                checked={category.isSuper}
                onChange={(event) => {
                  dispatch({ type: "toggleSuper", id: categoryId, isSuper: event.target.checked });
                }} />
            }
            label={"Contains other categories"}
          />
          {category.isSuper &&
            <Button
              sx={{ margin: "1rem", width: "fit-content" }}
              variant="outlined"
              onClick={(event) => {
                dispatch({ type: "addCategoryAllocation", id: categoryId });
              }}>
              Add Allocation
            </Button>}
        </Box>
        <IconButton
          sx={{ margin: "1rem" }}
          onClick={(event) => {
            dispatch({ type: "deleteCategory", id: categoryId });
          }}>
          <Clear/>
        </IconButton>
      </Box>
      {category.isSuper && category.allocations && category.allocations.size > 0 &&
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "1rem",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          {Array.from(category.allocations).map(([allocationId, allocation], index) => (
            <Allocation
              key={allocationId}
              availableCategories={allCategories}
              selectedCategory={allocation.categoryId}
              value={allocation.percent}
              onChangeCategorySelected={(event) => {
                dispatch({ type: "changeAllocationCategory", categoryId, allocationId, selectedCategoryId: event.target.value })
              }}
              onChangeValue={(event) => {
                dispatch({ type: "changeAllocationValue", categoryId, allocationId, value: event.target.value });
              }}
              onDelete={(event) => {
                dispatch({ type: "deleteCategoryAllocation", categoryId, allocationId })
              }}
            />
          ))}
        </Box>}
    </Card>
  );
}