
import { Routes, Route } from "react-router-dom";
import routes from "./Routes";

const Router = () => {
  return (
    <Routes>
      {Object.values(routes).map((route, idx) => {
        return <Route key={idx} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
};

export default Router;
