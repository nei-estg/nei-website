import { useEffect, useState } from "react"
import { IBlogPost } from "@src/interfaces/IBlogPost";
import { toast, Bounce } from "react-toastify";
import { Avatar, Container, Grid, Paper, ThemeProvider, Typography, createTheme, styled, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { getBlog } from "@src/api/BlogRoutes";


const defaultTheme = createTheme();

export default function PostPage() {
  const isXs = useMediaQuery(defaultTheme.breakpoints.only('xs'));
  const isSm = useMediaQuery(defaultTheme.breakpoints.only('sm'));
  const isMd = useMediaQuery(defaultTheme.breakpoints.only('md'));
  const isLg = useMediaQuery(defaultTheme.breakpoints.only('lg'));
  const isXl = useMediaQuery(defaultTheme.breakpoints.only('xl'));

  const [post, setPost] = useState<IBlogPost[]>([]);

  const { slug } = useParams();


  useEffect(() => {
    document.title = "Blog - NEI";
    //TODO: Implement Pagination
    getBlog(slug).then((response) =>{
      setPost(response.results)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder ao Post! Por favor tenta novamente!", {
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



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginBottom: '60px' }}>
        <div>
          {post.map((postItem, index) => (
            <div>
              <Typography variant="subtitle2" color="#969696" sx={{marginLeft: '5px', marginRight: '10px'}}>{postItem.title}</Typography>
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  )
}