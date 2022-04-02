import { InputAdornment, TextField } from "@mui/material";

export default function DollarTextField({ sx, label, value, onChange }) {

  return (
    <TextField
      sx={sx}
      label={label}
      type="number"
      value={Number(value).toString()}
      onChange={(val) => onChange(parseFloat(val.target.value))}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      inputProps={{
        pattern: '[0-9.]*'
      }}
    />
  )
}