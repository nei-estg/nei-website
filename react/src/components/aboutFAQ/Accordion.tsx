import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/components/redux/store';


export default function AccordionUsage({ question, answer }) {
  const darkReader = useSelector((state: RootState) => state.theme.darkMode);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const handleAccordionChange = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <div style={{marginBottom: '15px', marginTop: '15px',}}>
      <Accordion expanded={isAccordionExpanded} onChange={handleAccordionChange} sx={{color: darkReader ? "#181A1B" : "#FFFFFF"}}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ color: darkReader ? "#FFFFFF" : "#1E2022", backgroundColor: darkReader ? "#191919" : "#FFFFFF", fontWeight: 700, }}
        >
          {question}
        </AccordionSummary>

        <AccordionDetails sx={{color: "#969696", backgroundColor: darkReader ? "#191919" : "#FFFFFF",}}>{answer}</AccordionDetails>
      </Accordion>
    </div>
  );
}