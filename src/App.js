import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/Home";

function App() {
  return (
    <Layout>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
