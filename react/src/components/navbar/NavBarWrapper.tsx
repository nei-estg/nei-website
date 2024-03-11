import React from "react";
import routes from "@src/router/Routes";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import NavBarMain from "./NavBarMain";

interface NavBarWrapperProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBarWrapper({ darkMode, setDarkMode }: NavBarWrapperProps) {
  const location = useLocation();
  const isFrontPage = location.pathname === routes.frontpage.path;

  return isFrontPage ? (
    <NavBarMain darkMode={darkMode} setDarkMode={setDarkMode} />
  ) : (
    <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
  );
}

export default NavBarWrapper;
