import "./App.css";
import { Landing, Home, Detail, Form } from "./components/index";
import { Route, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const location = useLocation();


  return (
    <div className="App">
     
      {location.pathname !== "/" && <Navbar />}
      
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
      <Route path="/detail/:id" component={Detail} />
        <Route path="/recipe" component={Form} />
      
    </div>
  );
}

export default App;
