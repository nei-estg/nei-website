import { IPaginatedResponse } from "@src/interfaces/IPaginatedResponse";
import client from "./Client"
import { IBogPost } from "@src/interfaces/IBlogPost";

export const getBlogList = async () => {
  try {
    const response = await client.get("/api/blogPost")
    if (response.status !== 200) throw new Error();
    return response.data as IPaginatedResponse<IBogPost>
  } catch (error) {
    throw new Error("Error fetching blog list!")
  }
}