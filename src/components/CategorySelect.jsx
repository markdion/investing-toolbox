import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CategorySelect({ sx, availableCategories, selectedCategory, onChangeSelected }) {

  return (
    <FormControl sx={sx}>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={onChangeSelected}
      >
        {availableCategories &&
          Array.from(availableCategories).map(([availableCategoryId, availableCategory], index) => (
            <MenuItem
              key={availableCategoryId}
              value={availableCategoryId}>
                {availableCategory.name}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}