import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";
import RegisterPage from "@src/pages/RegisterPage";
import ResetPasswordPage from "@src/pages/ResetPasswordPage";
import LogoutPage from "@src/pages/LogoutPage";
import ProfilePage from "@src/pages/ProfilePage";
import MentoringPage from "@src/pages/MentoringPage";
import CalendarPage from "@src/pages/CalendarPage";
import AboutFAQPage from "@src/pages/AboutFAQ";
import MaterialsPage from "@src/pages/MaterialsPage";
import BlogPage from "@src/pages/BlogPage";
import NotFoundPage from "@src/pages/NotFoundPage";

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
  logoutpage: {
    path: '/logout',
    element: <LogoutPage />,
  },
  logoutallpage: {
    path: '/logout-all',
    element: <LogoutPage />,
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
  aboutFAQpage: {
    path: '/about',
    element: <AboutFAQPage />,
  },
  materialspage: {
    path: '/materials',
    element: <MaterialsPage />,
  },
  blogpage: {
    path: '/blog',
    element: <BlogPage />,
  },
  notfoundpage: {
    path: '*',
    element: <NotFoundPage/>,
  }
}

export default routes;