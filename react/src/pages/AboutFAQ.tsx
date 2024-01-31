import { Avatar, Grid, Paper, Tab, Tabs, Typography, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccordionUsage from "@src/components/aboutFAQ/Accordion";
import { SyntheticEvent, useState } from "react";

const defaultTheme = createTheme();


interface TeamItem {
  photo: string;
  role: string;
  fullname: string;
}

interface DirecaoItem {
  year: string;
  team: TeamItem[];
}

const direcao: DirecaoItem[] = 
[
  {
    year: "2023/2024",
    team: [
      { photo: "https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", role: "Presidente", fullname: "Hélder Branco" },
      { photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8MXwwfHx8MA%3D%3D", role: "Vice-Presidente", fullname: "Daniel Teixeira" },
      { photo: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", role: "Vice-Presidente", fullname: "Emanuel Rego" },
      { photo: "logo.png", role: "Tesoureiro", fullname: "João Oliveira" },
      { photo: "logo.png", role: "Secretário", fullname: "Hélder Carneiro" },
      { photo: "logo.png", role: "Vogal", fullname: "Mariana Martins" },
      { photo: "logo.png", role: "Vogal", fullname: "Orlando Pires" },  
      { photo: "logo.png", role: "Vogal", fullname: "Eduardo Dias" },
      { photo: "logo.png", role: "Vogal", fullname: "Guilherme Castro" },
    ],
  },
  {
    year: "2024/2025",
    team: [
      { photo: "logo.png", role: "Presidente", fullname: "Hélder Branco" },
    ],
  },
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

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


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

      
      {/*Direcao*/}
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

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{marginBottom: '20px'}}>
          
        {direcao.map((member, index) => (
          <Tab label={member.year} key={index} />
        ))}
      </Tabs>

      
      {/* Conteudo de cada tab (cada ano) */}
      {direcao.map((member, index) => (
        <div key={index} style={{ display: value === index ? 'block' : 'none' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {member.team.map((teamMember, teamIndex) => (
            <Grid item xs={3} sm={2} md={2} key={teamIndex} display="flex" alignItems="center">
              <Grid container direction="column" display="flex" alignItems="center" spacing={1} sx={{marginBottom: '5px'}}>
                <Item>
                  <Avatar src={teamMember.photo} sx={{ width: '128px', height: '128px', marginBottom: '10px' }} variant="rounded"/>
                  <Typography variant="subtitle1" color="primary">{teamMember.role}</Typography>
                  <Typography variant="body1">{teamMember.fullname}</Typography>
                </Item>
              </Grid>
            </Grid>
          ))}
          </Grid>
        </div>
      ))}






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
      {faq.map((faq, index) => (
        <div key={index}>
          <Typography variant="h5"
            sx={{
              color: '#1E2022',
              display: 'flex',
              fontWeight: 700,
              flexDirection: 'column',
              alignItems: 'left',
              marginTop: '55px',
              marginBottom: '10px',
            }}>{faq.section}</Typography>
          
            {faq.qa.map((qa, qaIndex) => (
              <AccordionUsage key={qaIndex} question={qa.question} answer={qa.answer}/>
            ))}
        </div>
      ))}
      
      </Container>
    </ThemeProvider>
  )
}