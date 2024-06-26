import { Clear } from "@mui/icons-material";
import { Box, Card, IconButton } from "@mui/material";
import CategorySelect from "./CategorySelect";
import PercentTextField from "./shared/PercentTextField";

export default function Allocation({ availableCategories, selectedCategory, value, onChangeCategorySelected, onChangeValue, onDelete }) {

  return (
    <Card sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem 1rem 1rem"
      }}
      variant="outlined"
    >
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