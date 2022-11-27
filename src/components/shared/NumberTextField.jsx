import { TextField } from "@mui/material";

export default function NumberTextField({ sx, label, value, onChange }) {

  return (
    <TextField
      sx={sx}
      label={label}
      type="number"
      value={Number(value).toString()}
      onChange={(val) => onChange(parseFloat(val.target.value))}
      inputProps={{
        pattern: '[0-9.]*'
      }}
    />
  )
}