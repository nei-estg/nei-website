import client from "./Client"
import { ICourse } from "@src/interfaces/ICourse";

export const getCourses = async () => {
  const response = await client.get('/api/course/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as ICourse[];
}
