import { InputAdornment, TextField } from "@mui/material";

export default function DollarTextField({ sx, label, value, onChange }) {

  return (
    <TextField
      sx={sx}
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  )
}