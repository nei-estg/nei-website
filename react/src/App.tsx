import {
  BrowserRouter
} from "react-router-dom";
import Router from "./router/Router";

function App() {
  // TODO: ADD REACT ROUTER DOM <BrowserRouter> 
  // TODO: ADD THEME <ThemeProvider> 
  // para acrescentar dark/light mode toggle é preciso state management ;)

  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  )
}

export default App
