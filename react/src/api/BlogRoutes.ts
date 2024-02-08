import client from "./Client"
import { IPaginatedResponse } from "@src/interfaces/IPaginatedResponse";
import { IBlogPost } from "@src/interfaces/IBlogPost";

export const getBlogList = async () => {
  const response = await client.get("/api/blogPost")
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IPaginatedResponse<IBlogPost>
}
