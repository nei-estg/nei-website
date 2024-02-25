import client from "./Client"
import { IPaginatedResponse } from "@src/interfaces/IPaginatedResponse";
import { IBlogPost } from "@src/interfaces/IBlogPost";

export const getBlogList = async () => {
  const response = await client.get("/api/blogPost")
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IPaginatedResponse<IBlogPost>
}

export const getBlog = async (slug: string) => {
  const response = await client.get(`/api/blogPost/?slug=${slug}`)
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IPaginatedResponse<IBlogPost>
}

export const getBlogPaginated = async (url: string) => {
  const response = await client.get(url)
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IPaginatedResponse<IBlogPost>
}
