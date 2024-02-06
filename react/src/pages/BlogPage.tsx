import { getBlogList } from "@src/api/BlogRoutes"
import { useEffect, useState } from "react"
import { IBlogPost } from "@src/interfaces/IBlogPost";

export default function BlogPage() {
  const [blogList, setBlogList] = useState<IBlogPost[]>([]);

  useEffect(() => {
    //TODO: Implement Pagination
    getBlogList().then((response) =>{
      setBlogList(response.results)
    }).catch();
  }, [])
  return (
    <>
      <h1>BlogPage</h1>
      <p>{JSON.stringify(blogList)}</p>
    </>
  )
}