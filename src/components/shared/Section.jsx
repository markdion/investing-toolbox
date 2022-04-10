import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

export default function Section({
  accordionOpen,
  headerText,
  subHeaderText,
  bodyComponent }) {

  const [expanded, setExpanded] = useState(accordionOpen ?? false);

  return (
    <Accordion sx={{
        width: "60%"
      }}
      square={true}
      expanded={expanded}
      onChange={(event, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary sx={{
          bgcolor: "primary.light"
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6" align="left">{headerText}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1" align="left">{subHeaderText}</Typography>
        {bodyComponent}
      </AccordionDetails>
    </Accordion>
  );
}