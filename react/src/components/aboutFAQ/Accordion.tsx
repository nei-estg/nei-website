import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';


export default function AccordionUsage({ question, answer }) {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const handleAccordionChange = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <div style={{marginBottom: '15px', marginTop: '15px',}}>
      <Accordion expanded={isAccordionExpanded} onChange={handleAccordionChange} sx={{color: "#FFFFFF"}}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ color: "#1E2022", backgroundColor: "#FFFFFF", fontWeight: 700, }}
        >
          {question}
        </AccordionSummary>

        <AccordionDetails sx={{color: "#969696", backgroundColor: "#FFFFFF",}}>{answer}</AccordionDetails>
      </Accordion>
    </div>
  );
}