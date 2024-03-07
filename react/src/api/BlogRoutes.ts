import client from "./Client"
import { IBlogPost } from "@src/interfaces/IBlogPost";

export const getBlogList = async () => {
  const response = await client.get("/api/blogPost")
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IBlogPost[]
}

export const getBlog = async (slug: string) => {
  const response = await client.get(`/api/blogPost/?slug=${slug}`)
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IBlogPost[]
}
