import routes from "@src/router/Routes";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import NavBarMain from "./NavBarMain";



function NavBarWrapper() {
  const location = useLocation();
  const isFrontPage = location.pathname === routes.frontpage.path;

  return isFrontPage ? (
    <NavBarMain />
  ) : (
    <NavBar />
  );
}

export default NavBarWrapper;
