import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccordionUsage from "@src/components/aboutFAQ/Accordion";

const defaultTheme = createTheme();

interface QaItem
{
  question: string;
  answer: string;
}

interface FaqSection
 {
  section: string;
  qa: QaItem[];
}

const faq: FaqSection[] = 
[
  {
    section: "Básicos",
    qa: [
      {
        question: "Can I purchase a gift certificate?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        question: "Can I purchase a gift certificate?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
  },
  {
    section: "Contas e Definições",
    qa: [
      {
        question: "Can I purchase a gift certificate?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        question: "Can I purchase a gift certificate?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
  },
];

export default function AboutFAQPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{marginBottom: '60px'}}>

      {/*F.A.Q.*/}
      <Typography variant="subtitle1"
        sx={{ 
          color: '#969696', 
          display: 'flex',
          fontWeight: 600, 
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '30px',
          marginBottom: '20px',
          }} 
        >F.A.Q.</Typography>

      <Typography variant="h3"
        sx={{ 
          color: '#1E2022', 
          display: 'flex', 
          fontWeight: 700,
          flexDirection: 'column', 
          alignItems: 'center',
          marginBottom: '15px',
          }} 
        >Tens alguma questão?</Typography>

      <Typography variant="h6"
        sx={{ 
          color: '#969696', 
          display: 'flex',
          fontWeight: 600, 
          flexDirection: 'column', 
          alignItems: 'center',
          marginBottom: '20px',
          }} 
        >Pesquisa no nosso F.A.Q. para obteres as respostas para qualquer coisa que possas perguntar.</Typography>


      {/* QA */}
      {faq.map((faq) => (
        <>
        <Typography variant="h5"
          sx={{
            color: '#1E2022',
            display: 'flex',
            fontWeight: 700,
            flexDirection: 'column',
            alignItems: 'left',
            marginTop: '55px',
            marginBottom: '10px',
          }}
        >{faq.section}</Typography>
        
          {faq.qa.map((qa) => (
            <AccordionUsage question={qa.question} answer={qa.answer}/>
          ))}
        </>
      ))}
      
      </Container>
    </ThemeProvider>
  )
}