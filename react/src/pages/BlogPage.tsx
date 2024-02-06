import { getBlogList } from "@src/api/BlogRoutes"
import { useEffect } from "react"

export default function BlogPage() {
  useEffect(() => {
    getBlogList().then((response) =>{
      console.log(response);
    }).catch();
  }, [])
  return (
    <>
      <p>BlogPage</p>
    </>
  )
}