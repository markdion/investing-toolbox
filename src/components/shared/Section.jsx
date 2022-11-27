import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

export default function Section({
  accordionOpen,
  headerText,
  headerSummary,
  isComplete,
  subHeaderText,
  bodyComponent }) {

  const [expanded, setExpanded] = useState(accordionOpen ?? false);

  return (
    <Accordion
      square={true}
      expanded={expanded}
      onChange={(event, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary sx={{
          bgcolor: "primary.light"
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Typography variant="h6" align="left">{headerText}</Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
          }}>
            {headerSummary != null &&
              <Typography sx={{ color: 'text.secondary' }}>{headerSummary}</Typography>}
            {headerSummary != null &&
              (isComplete ? <CheckIcon color={"success"} sx={{marginLeft: "1rem"}}/> : <CloseIcon color={"error"} sx={{marginLeft: "1rem"}}/>)}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1" align="left">{subHeaderText}</Typography>
        {bodyComponent}
      </AccordionDetails>
    </Accordion>
  );
}