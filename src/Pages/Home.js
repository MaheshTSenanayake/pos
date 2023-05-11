import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PosSystemHomeLayout from "../Components/Layout/PosSystemHomeLayout";
import { getStockItems } from "../store/action/cartAction";

const data = require("../data.json");

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockItems(data));
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#1976d23d" }}>
      <PosSystemHomeLayout />
    </div>
  );
}

export default Home;
