import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Page1} />
      <Route path="/page2" component={Page2} />
    </BrowserRouter>
  );
}

export default App;
