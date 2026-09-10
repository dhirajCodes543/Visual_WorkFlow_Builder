import { Router, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import { useGetDataOnPageMount } from "./CustomHooks/useGetDataOnPageMount"
import Home from "./Components/Home/Home";
import WorkFlows from "./Components/prevWorkFlows/PrevWorkFLow";
import WorkFlowDetails from "./Components/SelectedWorkFlow/WorkFlowDetails";

function App() {
  useGetDataOnPageMount();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/workFlows" element={<WorkFlows />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/workFlow/:id"
            element={<WorkFlowDetails />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
