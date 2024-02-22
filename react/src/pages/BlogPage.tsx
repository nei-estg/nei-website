import { getBlogList } from "@src/api/BlogRoutes"
import { useEffect, useState } from "react"
import { IBlogPost } from "@src/interfaces/IBlogPost";
import { toast, Bounce } from "react-toastify";
import { Avatar, Container, Grid, Paper, ThemeProvider, Typography, createTheme, styled } from "@mui/material";

const defaultTheme = createTheme();


export default function BlogPage() {
  const [blogList, setBlogList] = useState<IBlogPost[]>([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    document.title = "Blog - NEI";
    //TODO: Implement Pagination
    getBlogList().then((response) =>{
      setBlogList(response.results)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder ao Blog! Por favor tenta novamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  }, [])


  // Função para formatar a data (dd mm aaaa)
  function formatDate(dateString: string): string 
  {
    const date = new Date(dateString);
    const months = [
      'Jan', 'Fev', 'Mar',
      'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set',
      'Out', 'Nov', 'Dez'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginBottom: '60px' }}>
      
      <div>
        <Grid container spacing={1}>
          {blogList.map((blogItem, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4} xl={4}>
              <Grid container direction="column">
                <Item>
                  {/* Usando um div para o avatar com imagem de fundo */}
                  <div style={{
                    width: '100%', 
                    height: '265px', 
                    marginBottom: '10px', 
                    borderRadius: '4px',
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${blogItem.images[0].image})`
                  }} alt={blogItem.images[0].name} />
                  
                  {/*categorias e data*/}
                  <Grid container>
                    <Grid item>
                      <Grid container direction="row">
                        {/*categorias*/}
                        {blogItem.topics.map((blogItemTopic, indexTopic) => (
                          <Typography variant="subtitle2" color="#636F80" sx={{marginRight: '5px'}}>{blogItemTopic.name}</Typography>
                        ))}

                        <Typography variant="subtitle2" color="#969696" sx={{marginLeft: '5px', marginRight: '10px'}}>•</Typography>
                        <Typography variant="subtitle2" color="#969696">{formatDate(blogItem.date)}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="subtitle1" color="primary">{blogItem.title}</Typography>
                  <Typography variant="subtitle2">{blogItem.description}</Typography>

                  {/*nome autor e curso*/}
                </Item>
              </Grid>
            </Grid>
          ))}
        </Grid>
</div>


      </Container>
    </ThemeProvider>
  )
}