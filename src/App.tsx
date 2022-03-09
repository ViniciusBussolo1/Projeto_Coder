import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Users } from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/users" component={Users} />
    </BrowserRouter>
  );
}

export default App;
