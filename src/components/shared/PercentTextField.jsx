import { InputAdornment, TextField } from "@mui/material";

export default function PercentTextField({ sx, label, value, onChange }) {

  return (
    <TextField
      sx={sx}
      label={label}
      type="number"
      value={Number(value).toString()}
      onChange={(val) => onChange(parseFloat(val.target.value))}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      inputProps={{
        pattern: '[0-9.]*'
      }}
    />
  )
}