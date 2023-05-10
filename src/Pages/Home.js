import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStockItems } from "../action/cartAction";
import ThreeColumnLayout from "../Components/Layout/ThreeColumnLayout";

const data = require("../data.json");

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockItems(data));
  }, [dispatch]);

  return (
    <div>
      <ThreeColumnLayout />
    </div>
  );
}

export default Home;
