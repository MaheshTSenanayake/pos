import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/Home";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </Layout>
    </Provider>
  );
}

export default App;
