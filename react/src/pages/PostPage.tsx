import {
  Avatar,
  Button,
  Container,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery
} from "@mui/material";
import { getBlog } from "@src/api/BlogRoutes";
import Carousel from "@src/components/post/Carousel";
import { IBlogPost } from "@src/interfaces/IBlogPost";
import { ICourse } from "@src/interfaces/ICourse";
import routes from "@src/router/Routes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const defaultTheme = createTheme();

export default function PostPage() {
  const isXs = useMediaQuery(defaultTheme.breakpoints.only("xs"));
  const isSm = useMediaQuery(defaultTheme.breakpoints.only("sm"));
  const isMd = useMediaQuery(defaultTheme.breakpoints.only("md"));
  const isLg = useMediaQuery(defaultTheme.breakpoints.only("lg"));
  const isXl = useMediaQuery(defaultTheme.breakpoints.only("xl"));

  const [post, setPost] = useState<IBlogPost[]>([]);
  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    document.title = routes.blogpage.name;
    getBlog(slug)
      .then((response) => {
        if (response.length == 0) {
          navigate("/404");
        } else {
          document.title = response[0].title + " - NEI";
          setPost(response);
        }
      })
      .catch(() => {
        // Exibe a mensagem de erro
        toast.error(
          "Ocorreu um erro ao aceder ao Post! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: "30px", marginBottom: "60px" }}>
        <div>
          <Grid container spacing={1}>
            {post.map((postItem, index) => (
              <Grid item key={index} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    {/*data e titulo*/}
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "14px",
                        backgroundColor: "#054496",
                        color: "#FFFFFF",
                        borderRadius: "100px",
                        alignSelf: "center",
                      }}
                    >
                      {postItem.topics.map((topic) => topic.name).join(", ")} •{" "}
                      {new Date(postItem.date).toLocaleDateString("PT")}
                    </Button>

                    <Typography
                      color="#002454"
                      sx={{
                        fontSize: {
                          xs: "24px",
                          sm: "30px",
                          md: "36px",
                          lg: "42px",
                          xl: "48px",
                        },
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      {postItem.title}
                    </Typography>

                    {/*nome autor e curso*/}
                    <Grid
                      container
                      sx={{ marginTop: "20px", marginBottom: "20px" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Grid container direction="row">
                          <Avatar
                            src={postItem.author.profilemodel?.image}
                            sx={{ alignSelf: "center" }}
                          />
                          <div>
                            <Typography
                              variant="subtitle2"
                              color="#636F80"
                              sx={{
                                fontSize: "16px",
                                marginLeft: "10px",
                                textAlign: "start",
                              }}
                            >
                              {postItem.author.first_name}{" "}
                              {postItem.author.last_name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="#969696"
                              sx={{
                                fontSize: "16px",
                                marginLeft: "10px",
                                textAlign: "start",
                              }}
                            >
                              {postItem.author.profilemodel?.course
                                ?.map((course: ICourse) => course.abbreviation)
                                .join(", ")}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/*descricao*/}
                    <Typography
                      color="#969696"
                      sx={{
                        fontSize: {
                          xs: "22px",
                          sm: "22px",
                          md: "22px",
                          lg: "22px",
                          xl: "22px",
                        },
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      {postItem.description}
                    </Typography>

                    {/*imagem*/}
                    {postItem.images.length === 1 ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={postItem.images[0].image}
                          alt="Post Image"
                          style={{
                            maxWidth: "25%",
                            maxHeight: "25%",
                            margin: "15px 0 15px 0",
                          }}
                        />
                      </div>
                    ) : (
                      <Carousel
                        data={postItem.images}
                        maxWidth={{
                          xs: 300,
                          sm: 400,
                          md: 500,
                          lg: 600,
                          xl: 700,
                        }}
                      />
                    )}

                    {/*conteudo*/}
                    <Typography
                      color="#1E2022"
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "20px",
                          md: "20px",
                          lg: "20px",
                          xl: "20px",
                        },
                        marginTop: "10px",
                        marginBottom: "50px",
                        textAlign: "center",
                      }}
                    >
                      {postItem.content}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  );
}
