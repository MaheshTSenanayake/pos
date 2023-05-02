import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
