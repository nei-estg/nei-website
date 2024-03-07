import routes from "@src/router/Routes";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { FooterMain } from "./FooterMain";

function FooterWrapper() {
  const location = useLocation();
  const isFrontPage = location.pathname === routes.frontpage.path;
  return isFrontPage ? <FooterMain /> : <Footer />;
}

export default FooterWrapper;
