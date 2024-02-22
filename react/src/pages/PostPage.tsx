import { useEffect, useState } from "react"
import { IBlogPost } from "@src/interfaces/IBlogPost";
import { toast, Bounce } from "react-toastify";
import { Avatar, Container, Grid, Paper, ThemeProvider, Typography, createTheme, styled, useMediaQuery } from "@mui/material";
import { getPost } from "@src/api/PostRoutes";


const defaultTheme = createTheme();

export default function PostPage({id}) {
  const isXs = useMediaQuery(defaultTheme.breakpoints.only('xs'));
  const isSm = useMediaQuery(defaultTheme.breakpoints.only('sm'));
  const isMd = useMediaQuery(defaultTheme.breakpoints.only('md'));
  const isLg = useMediaQuery(defaultTheme.breakpoints.only('lg'));
  const isXl = useMediaQuery(defaultTheme.breakpoints.only('xl'));

  const [post, setPost] = useState<IBlogPost[]>([]);



}