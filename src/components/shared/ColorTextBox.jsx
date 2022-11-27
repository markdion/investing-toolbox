import { Box, Typography } from "@mui/material";

export default function ColorTextBox({ value, color, textColor }) {

  return (
    <Box sx={{
      backgroundColor: color,
      borderRadius: "0.25rem",
      padding: "0.25rem"
    }}>
      <Typography color={textColor} align="center">{value}</Typography>
    </Box>

  )
}