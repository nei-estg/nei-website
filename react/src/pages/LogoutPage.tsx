import { logoutUser } from "@src/api/UserRoutes";
import routes from "@src/router/Routes";

export default function LogoutPage() {
  const allDevices = window.location.pathname === routes.logoutallpage.path;
  logoutUser(allDevices);
  window.location.href = '/';
  return null;
}