import { getBlogList } from "@src/api/BlogRoutes"
import { useEffect, useState } from "react"
import { IBlogPost } from "@src/interfaces/IBlogPost";
import { toast, Bounce } from "react-toastify";

export default function BlogPage() {
  const [blogList, setBlogList] = useState<IBlogPost[]>([]);

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
  return (
    <>
      <h1>BlogPage</h1>
      <p>{JSON.stringify(blogList)}</p>
    </>
  )
}