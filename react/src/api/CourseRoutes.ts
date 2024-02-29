import client from "./Client"
import { ICourse } from "@src/interfaces/ICourse";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { getUser } from "./UserRoutes";

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

export const getCurricularUnitsCourseUser = async () => {
  const response = await client.get('/api/curricularUnit/');
  if (response.status !== 200) throw new Error(response.data);

  const curricularUnits = response.data as ICurricularUnit[];
  const user = await getUser();

  // Obtém os cursos do usuário como um array de abreviações de curso.
  const userCourses = user.profilemodel?.course?.map((course: ICourse) => course.abbreviation) || [];

 // Filtra as unidades curriculares cujo curso esteja presente nos cursos do usuário.
 const userCurricularUnits = curricularUnits.filter(uc => {
  // Verifica se pelo menos um dos cursos da unidade curricular está presente nos cursos do usuário.
  return uc.course.some(course => userCourses.includes(course.abbreviation));
});

return userCurricularUnits as ICurricularUnit[];
}