import { useEffect } from "react";
import "./App.css";
import Home from "./feature/Home";
import { Action, useStore } from "./store/Store";
import { Route, Routes } from "react-router-dom";
import PieChart from "./feature/PieChart";

function App() {
  const { fetch } = useStore();

  useEffect(() => {
    fetch(Action.GetList);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<PieChart />} />
      </Routes>
    </div>
  );
}

export default App;
