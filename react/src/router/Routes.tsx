import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";
import RegisterPage from "@src/pages/RegisterPage";
import ResetPasswordPage from "@src/pages/ResetPasswordPage";
import LogoutPage from "@src/pages/LogoutPage";
import ProfilePage from "@src/pages/ProfilePage";
import MentoringPage from "@src/pages/MentoringPage";
import CalendarPage from "@src/pages/CalendarPage";
import AboutFAQPage from "@src/pages/AboutFAQPage";
import MaterialsPage from "@src/pages/MaterialsPage";
import BlogPage from "@src/pages/BlogPage";
import NotFoundPage from "@src/pages/NotFoundPage";
import PostPage from "@src/pages/PostPage";
import ChangePasswordPage from "@src/pages/ChangePasswordPage";
import PrivacyPolicyPage from "@src/pages/PrivacyPolicyPage";
import ActivateAccountPage from "@src/pages/ActivateAccountPage";

interface IRoutes {
  [key: string]: {
    name: string,
    path: string,
    element: JSX.Element,
  }
}

const routes: IRoutes = {
  frontpage: {
    name: 'Página Inicial - NEI',
    path: '/',
    element: <FrontPage />,
  },
  loginpage: {
    name: 'Iniciar Sessão',
    path: '/login',
    element: <LoginPage />,
  },
  registerpage: {
    name: 'Registar - NEI',
    path: '/register',
    element: <RegisterPage />,
  },
  activateaccountpage: {
    name: 'Ativar Conta - NEI',
    path: '/activateAccount/',
    element: <ActivateAccountPage />,
  },
  resetpasswordpage: {
    name: 'Redefinir Palavra Passe - NEI',
    path: '/resetPassword',
    element: <ResetPasswordPage />,
  },
  changepasswordpage: {
    name: 'Mudar Palavra Passe - NEI',
    path: '/changePassword',
    element: <ChangePasswordPage />,
  },
  logoutpage: {
    name: 'Terminar Sessão - NEI',
    path: '/logout',
    element: <LogoutPage />,
  },
  logoutallpage: {
    name: 'Terminar Sessão - NEI',
    path: '/logoutAll',
    element: <LogoutPage />,
  },
  profilepage: {
    name: 'Perfil - NEI',
    path: '/profile',
    element: <ProfilePage />,
  },
  mentoringpage: {
    name: 'Mentoria - NEI',
    path: '/mentoring',
    element: <MentoringPage />,
  },
  calendarpage: {
    name: 'Calendário - NEI',
    path: '/calendar',
    element: <CalendarPage />,
  },
  aboutFAQpage: {
    name: 'Sobre Nós - NEI',
    path: '/about',
    element: <AboutFAQPage />,
  },
  materialspage: {
    name: 'Materiais UC\'s - NEI',
    path: '/materials',
    element: <MaterialsPage />,
  },
  blogpage: {
    name: 'Blog - NEI',
    path: '/blog',
    element: <BlogPage />,
  },
  postpage: {
    name: 'Post - NEI',
    path: '/blog/post/:slug',
    element: <PostPage />,
  },
  privacypolicypage: {
    name: 'Política de Privacidade - NEI',
    path: '/privacy-policy',
    element: <PrivacyPolicyPage/>,
  },
  notfoundpage: {
    name: 'Não Existe',
    path: '*',
    element: <NotFoundPage/>,
  }
}

export default routes;