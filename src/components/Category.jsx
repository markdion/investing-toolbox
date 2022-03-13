import { Clear } from "@mui/icons-material";
import { Box, Button, Card, FormControlLabel, IconButton, Switch, TextField } from "@mui/material";
import Allocation from "./Allocation";

export default function Category({
  category,
  categoryId,
  onChangeName,
  onToggleSuper,
  deleteCategory,
  addCategoryAllocation,
  onChangeAllocationCategorySelected,
  onChangeAllocationValue,
  onDeleteAllocation,
  allCategories }) {

  return (
    <Card sx={{
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "flex-start",
      margin: "1rem"
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
              onChangeName(categoryId, event.target.value);
            }}
          />
          <FormControlLabel
            sx={{ margin: "1rem" }}
            control={
              <Switch
                checked={category.isSuper}
                onChange={(event) => {
                  onToggleSuper(categoryId, event.target.checked);
                }} />
            }
            label={"Contains other categories"}
          />
        </Box>
        {category.isSuper &&
          <Button
            sx={{ margin: "1rem", width: "fit-content" }}
            variant="outlined"
            onClick={(event) => {
              addCategoryAllocation(categoryId);
            }}>
            Add Allocation
          </Button>}
        <IconButton
          sx={{ margin: "1rem" }}
          onClick={(event) => {
            deleteCategory(categoryId);
          }}>
          <Clear/>
        </IconButton>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "1rem",
        flexWrap: "wrap"
      }}>
        {category.isSuper && category.allocations &&
          Array.from(category.allocations).map(([allocationId, allocation], index) => (
            <Allocation
              key={allocationId}
              availableCategories={allCategories}
              selectedCategory={allocation.categoryId}
              value={allocation.percent}
              onChangeCategorySelected={(event) => {
                onChangeAllocationCategorySelected(categoryId, allocationId, event.target.value);
              }}
              onChangeValue={onChangeAllocationValue}
              onDelete={(event) => {
                onDeleteAllocation(categoryId, allocationId);
              }}
            />
          ))}
        </Box>
    </Card>
  );
}