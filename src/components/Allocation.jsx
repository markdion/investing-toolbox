import { Clear } from "@mui/icons-material";
import { Box, Card, IconButton } from "@mui/material";
import CategorySelect from "./CategorySelect";
import PercentTextField from "./PercentTextField";

export default function Allocation({ availableCategories, selectedCategory, value, onChangeCategorySelected, onChangeValue, onDelete }) {

  return (
    <Card sx={{
      display: "flex",
      flexDirection: "column",
      padding: "0 1rem 1rem 1rem",
      margin: "0 1rem 1rem 0"
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}>
        <IconButton
          sx={{ marginRight: "-1rem", alignSelf: "flex-end" }}
          onClick={onDelete}>
          <Clear/>
        </IconButton>
      </Box>
      <CategorySelect
        sx={{ marginBottom: "1rem" }}
        availableCategories={availableCategories}
        selectedCategory={selectedCategory}
        onChangeSelected={onChangeCategorySelected}
      />
      <PercentTextField
        label={"Share of Total"}
        value={value}
        onChange={onChangeValue}
      />
    </Card>
  )
}