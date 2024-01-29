import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";
import RegisterPage from "@src/pages/RegisterPage";
import MentoringPage from "@src/pages/MentoringPage";

interface IRoutes {
  [key: string]: {
    path: string,
    element: JSX.Element,
  }
}

const routes: IRoutes = {
  loginpage: {
    path: '/login',
    element: <LoginPage />,
  },
  registerpage: {
    path: '/register',
    element: <RegisterPage />,
  },
  frontpage: {
    path: '/',
    element: <FrontPage />,
  },
  mentoringpage: {
    path: '/mentoring',
    element: <MentoringPage />,
  },
}

export default routes;