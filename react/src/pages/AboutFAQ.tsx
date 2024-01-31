import { Avatar, Grid, Paper, Typography, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccordionUsage from "@src/components/aboutFAQ/Accordion";

const defaultTheme = createTheme();

interface DirecaoItem {
  photo: string;
  role: string;
  fullname: string;
}

const direcao: DirecaoItem[] = 
[
  { photo: "logo.png", role: "Presidente", fullname: "Hélder Branco" },
  { photo: "logo.png", role: "Vice-Presidente", fullname: "Daniel Teixeira" },
  { photo: "logo.png", role: "Vice-Presidente", fullname: "Emanuel Rego" },
  { photo: "logo.png", role: "Tesoureiro", fullname: "João Oliveira" },
  { photo: "logo.png", role: "Secretário", fullname: "Hélder Carneiro" },
  { photo: "logo.png", role: "Vogal", fullname: "Mariana Martins" },
  { photo: "logo.png", role: "Vogal", fullname: "Orlando Pires" },  
  { photo: "logo.png", role: "Vogal", fullname: "Eduardo Dias" },
  { photo: "logo.png", role: "Vogal", fullname: "Guilherme Castro" },
];


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



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
      
      {/*About Us*/}
      <Typography variant="h3"
        sx={{ 
          color: '#1E2022', 
          display: 'flex', 
          fontWeight: 700,
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '30px',
          marginBottom: '15px',
          }} 
        >Sobre Nós</Typography>


      <Typography variant="subtitle1"
        sx={{ 
          color: '#969696', 
          display: 'flex',
          fontWeight: 600, 
          flexDirection: 'column', 
          alignItems: 'center',
          marginBottom: '20px',
          }} 
        >Direção</Typography>

      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {direcao.map((member) => (
          <Grid item xs={6} sm={3} md={2} key={member.fullname} display="flex" alignItems="center">
            <Grid container direction="column" display="flex" alignItems="center" spacing={1} sx={{marginBottom: '5px'}}>
              <Item>
                <Avatar src={member.photo} sx={{ width: '100%', height: 'auto', marginBottom: '10px' }} variant="rounded"/>
                <Typography variant="subtitle1" color="primary">{member.role}</Typography>
                <Typography variant="body1">{member.fullname}</Typography>
              </Item>
            </Grid>
          </Grid>
        ))}
      </Grid>






      {/*F.A.Q.*/}
      <Typography variant="h3"
        sx={{ 
          color: '#1E2022', 
          display: 'flex', 
          fontWeight: 700,
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '60px',
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