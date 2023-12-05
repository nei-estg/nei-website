import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";

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
  frontpage: {
    path: '/',
    element: <FrontPage />,
  },
}

export default routes;