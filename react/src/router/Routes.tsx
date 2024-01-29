import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";
import SignUpPage from "@src/pages/SignUpPage";

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
  signuppage: {
    path: '/signup',
    element: <SignUpPage />,
  },
  frontpage: {
    path: '/',
    element: <FrontPage />,
  },
}

export default routes;