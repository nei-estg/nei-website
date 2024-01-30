import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";
import RegisterPage from "@src/pages/RegisterPage";
import ResetPasswordPage from "@src/pages/ResetPasswordPage";
import ProfilePage from "@src/pages/ProfilePage";
import MentoringPage from "@src/pages/MentoringPage";
import CalendarPage from "@src/pages/CalendarPage";

interface IRoutes {
  [key: string]: {
    path: string,
    element: JSX.Element,
  }
}

const routes: IRoutes = {
  frontpage: {
    path: '/',
    element: <FrontPage />,
  },
  loginpage: {
    path: '/login',
    element: <LoginPage />,
  },
  registerpage: {
    path: '/register',
    element: <RegisterPage />,
  },
  resetpasswordpage: {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  profilepage: {
    path: '/profile',
    element: <ProfilePage />,
  },
  mentoringpage: {
    path: '/mentoring',
    element: <MentoringPage />,
  },
  calendarpage: {
    path: '/calendar',
    element: <CalendarPage />,
  },
}

export default routes;