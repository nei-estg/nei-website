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

export const getCurricularUnitsCourseUser = async () => {
  const response = await client.get('/api/curricularUnit/');
  if (response.status !== 200) throw new Error(response.data);

  const curricularUnits = response.data as ICurricularUnit[];
  
  const userCourses = localStorage.getItem('courses');
  const userCoursesParsed = userCourses ? JSON.parse(userCourses) as ICourse[] : undefined;

  if (!userCoursesParsed) {
    return curricularUnits;
  }

  // An user might have multiple courses just like curricular units have multiple courses
  // Return the curricular units of the courses the user is enrolled in
  
  const userCurricularUnits = curricularUnits.filter(curricularUnit => {
    return curricularUnit.course?.some(course => {
      return userCoursesParsed.some(userCourse => {
        return userCourse.abbreviation === course.abbreviation;
      });
    });
  });

  return userCurricularUnits;
};
