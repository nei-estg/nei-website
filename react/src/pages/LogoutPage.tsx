import { logoutUser } from "@src/api/UserRoutes";

export default function LogoutPage() {
  const allDevices = window.location.pathname === '/logout-all';
  logoutUser(allDevices);
  window.location.href = '/';
  return null;
}