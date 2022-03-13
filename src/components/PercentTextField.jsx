import { InputAdornment, TextField } from "@mui/material";

export default function PercentTextField({ sx, label, value, onChange }) {

  return (
    <TextField
      sx={sx}
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
    />
  )
}