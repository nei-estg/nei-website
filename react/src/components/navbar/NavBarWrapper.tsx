import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import NavBarMain from "./NavBarMain";

function NavBarWrapper() {
  const location = useLocation();
  const isFrontPage = location.pathname === "/";

  return isFrontPage ? <NavBarMain /> : <NavBar />;
}

export default NavBarWrapper;