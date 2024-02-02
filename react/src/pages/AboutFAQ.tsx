import { GitHub, LinkedIn } from "@mui/icons-material";
import { Avatar, Box, Grid, Paper, Tab, Tabs, Typography, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccordionUsage from "@src/components/aboutFAQ/Accordion";
import { SyntheticEvent, useEffect, useState } from "react";
import { getFAQ } from "@src/api/AboutRoutes";
import { IFAQ } from "@src/interfaces/IFAQ";

const defaultTheme = createTheme();

interface TeamItem {
  photo: string;
  role: string;
  fullname: string;
  github: string;
  linkedin: string;
}

interface DirecaoItem {
  year: string;
  team: TeamItem[];
}

const direcao: DirecaoItem[] =
  [
    /* {
      year: "2024/2025",
      team: [
        { photo: "logo.png", role: "Presidente", fullname: "Hélder Branco", github: "", linkedin: "" },
      ],
    }, */
    {
      year: "2023/2024",
      team: [
        { photo: "2023-24/helder-branco.png", role: "Presidente", fullname: "Hélder Branco", github: "", linkedin: "https://www.linkedin.com/in/h%C3%A9lder-branco/" },
        { photo: "2023-24/daniel-teixeira.png", role: "Vice-Presidente", fullname: "Daniel Teixeira", github: "https://github.com/8200378", linkedin: "https://www.linkedin.com/in/daniel-fr-teixeira/" },
        { photo: "2023-24/emanuel-rego.png", role: "Vice-Presidente", fullname: "Emanuel Rego", github: "https://github.com/RegoJunior09", linkedin: "https://www.google.com/" },
        { photo: "2023-24/joao-oliveira.png", role: "Tesoureiro", fullname: "João Oliveira", github: "https://github.com/joaopsoliveira2003", linkedin: "https://www.linkedin.com/in/joaopsoliveira2003/" },
        { photo: "2023-24/helder-carneiro.png", role: "Secretário", fullname: "Hélder Carneiro", github: "https://github.com/zyeinn", linkedin: "https://www.linkedin.com/in/heldercarneir0/" },
        { photo: "2023-24/mariana-martins.png", role: "Vogal", fullname: "Mariana Martins", github: "", linkedin: "https://www.linkedin.com/in/mariana-silva-a757a3221/" },
        { photo: "2023-24/orlando-pires.png", role: "Vogal", fullname: "Orlando Pires", github: "https://github.com/duarte-pires", linkedin: "https://www.linkedin.com/in/duartespires/" },
        { photo: "2023-24/eduardo-dias.png", role: "Vogal", fullname: "Eduardo Dias", github: "", linkedin: "https://www.linkedin.com/in/eduardo-dias-287b1a260/" },
        { photo: "2023-24/guilherme-castro.png", role: "Vogal", fullname: "Guilherme Castro", github: "", linkedin: "https://www.linkedin.com/in/guilherme-castro-957002273/" },
      ]
    }
  ];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface QaItem {
  question: string;
  answer: string;
}

interface FaqSection {
  section: string;
  qa: QaItem[];
}

const transformData = (originalData: IFAQ[]): FaqSection[] => {
  const transformedData: FaqSection[] = [];

  originalData.forEach((qa) => {
    const sectionName = qa.category.name;
    const existingSection = transformedData.find((section) => section.section === sectionName);

    const transformedQA: QaItem = {
      question: qa.question,
      answer: qa.answer
    };

    if (existingSection) {
      existingSection.qa.push(transformedQA);
    } else {
      transformedData.push({
        section: sectionName,
        qa: [transformedQA]
      });
    }
  });

  return transformedData;
};

export default function AboutFAQPage() {

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [hoveredIcons, setHoveredIcons] = useState({});

  const [faq, setFaq] = useState<FaqSection[]>([]);

  useEffect(() => {
    getFAQ().then((result) => {
      const faq: FaqSection[] = transformData(result.results);
      setFaq(faq);
    }).catch(() => {
      console.log("There was an error fetching FAQ data!");
    });
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginBottom: '60px' }}>

        {/*About Us*/}
        <Typography variant="h4"
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

        {/*Quem somos*/}
        <Typography variant="subtitle1"
          sx={{
            color: '#969696',
            display: 'flex',
            fontWeight: 600,
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >Quem somos</Typography>

        {/*Texto de apresentacao*/}
        <Container maxWidth="lg">
          <Typography variant="h6"
            sx={{
              color: '#1E2022',
              display: 'flex',
              fontWeight: 500,
              flexDirection: 'column',
              alignItems: 'left',
              marginBottom: '15px',

              '@media (max-width: 600px)': {
                fontSize: '1rem',  // Tamanho menor para xs
              },
              '@media (min-width: 600px) and (max-width: 960px)': {
                fontSize: '1.2rem',  // Tamanho maior que xs, menor que md (sm)
              },
              '@media (min-width: 960px)': {
                fontSize: '1.4rem',  // Tamanho md (h6)
              },
            }}
          >Somos o Núcleo de Estudantes de Informática da ESTG - IPP, e a nossa história é daquelas que começam com um grupo de amigos cheios de vontade de fazer acontecer. Juntámos as nossas paixões pela tecnologia e decidimos criar algo à maneira.
          </Typography>


          <Typography variant="h6"
            sx={{
              color: '#1E2022',
              display: 'flex',
              fontWeight: 500,
              flexDirection: 'column',
              alignItems: 'left',
              marginBottom: '15px',

              '@media (max-width: 600px)': {
                fontSize: '1rem',  // Tamanho menor para xs
              },
              '@media (min-width: 600px) and (max-width: 960px)': {
                fontSize: '1.2rem',  // Tamanho maior que xs, menor que md (sm)
              },
              '@media (min-width: 960px)': {
                fontSize: '1.4rem',  // Tamanho md (h6)
              },
            }}
          >No nosso Discord, estamos a bombar nos cursos de Informática da nossa universidade. É como um ponto de encontro para quem quer elevar os conhecimentos e fazer parte de uma comunidade que se apoia. Seja para trocar ideias, pedir dicas de programação ou só para descontrair, estamos sempre na boa.</Typography>


          <Typography variant="h6"
            sx={{
              color: '#1E2022',
              display: 'flex',
              fontWeight: 500,
              flexDirection: 'column',
              alignItems: 'left',
              marginBottom: '60px',

              '@media (max-width: 600px)': {
                fontSize: '1rem',  // Tamanho menor para xs
              },
              '@media (min-width: 600px) and (max-width: 960px)': {
                fontSize: '1.2rem',  // Tamanho maior que xs, menor que md (sm)
              },
              '@media (min-width: 960px)': {
                fontSize: '1.4rem',  // Tamanho md (h6)
              },
            }}
          >Por isso, se estiveres interessado em explorar o universo da Informática na ESTG - IPP, junta-te a nós nesta aventura!! 🚀💻</Typography>
        </Container>

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

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example">

            {direcao.map((member, index) => (
              <Tab label={member.year} key={index} />
            ))}
          </Tabs>
        </Box>

        {/* Conteudo de cada tab (cada ano) */}
        {direcao.map((member, index) => (
          <div key={index} style={{ display: value === index ? 'block' : 'none' }}>
            <Grid container spacing={1}>

              {member.team.map((teamMember, teamIndex) => (
                <Grid item xs={12} sm={4} md={3} lg={2} xl={1} key={teamIndex} display="flex" alignItems="center" sx={{ marginBottom: '1px', [defaultTheme.breakpoints.up('xl')]: { marginRight: '41px', }, }}>
                  <Grid container direction="column" display="flex" alignItems="center">
                    <Item>
                      <Avatar src={teamMember.photo} sx={{ width: '115px', height: '128px', marginBottom: '10px' }} variant="rounded" />

                      <Typography variant="subtitle1" color="primary">{teamMember.role}</Typography>
                      <Typography variant="subtitle2">{teamMember.fullname}</Typography>

                      {teamMember.github && (
                        <GitHub
                          sx={{ color: hoveredIcons[`github-${teamIndex}`] ? '#054496' : '#969696', fontSize: 30, cursor: 'pointer', marginTop: '5px' }}
                          onClick={() => window.open(teamMember.github, '_blank')}
                          onMouseEnter={() => setHoveredIcons(prevState => ({ ...prevState, [`github-${teamIndex}`]: true }))}
                          onMouseLeave={() => setHoveredIcons(prevState => ({ ...prevState, [`github-${teamIndex}`]: false }))}
                        />
                      )}

                      {teamMember.linkedin && (
                        <LinkedIn
                          sx={{ color: hoveredIcons[`linkedin-${teamIndex}`] ? '#054496' : '#969696', fontSize: 30, cursor: 'pointer', marginTop: '5px' }}
                          onClick={() => window.open(teamMember.linkedin, '_blank')}
                          onMouseEnter={() => setHoveredIcons(prevState => ({ ...prevState, [`linkedin-${teamIndex}`]: true }))}
                          onMouseLeave={() => setHoveredIcons(prevState => ({ ...prevState, [`linkedin-${teamIndex}`]: false }))}
                        />
                      )}

                    </Item>
                  </Grid>
                </Grid>
              ))}

            </Grid>
          </div>
        ))}




        {/*F.A.Q.*/}
        <Typography variant="h4"
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
              <AccordionUsage key={qaIndex} question={qa.question} answer={qa.answer} />
            ))}
          </div>
        ))}

      </Container>
    </ThemeProvider>
  )
}