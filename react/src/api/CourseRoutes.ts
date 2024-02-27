import client from "./Client"
import { ICourse } from "@src/interfaces/ICourse";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";

export const getCourses = async () => {
  const response = await client.get('/api/course/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as ICourse[];
}

export const getCurricularUnits = async () => {
  const response = await client.get('/api/curricularUnit/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as ICurricularUnit[];
}
