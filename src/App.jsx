import { Router,Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import { useGetDataOnPageMount } from "./CustomHooks/useGetDataOnPageMount"
import Home from "./Components/Home/Home";
import WorkFlows from "./Components/prevWorkFlows/PrevWorkFLow";

function App() {
  useGetDataOnPageMount();

  return (
   <>
    <Routes>
      <Route path="/" element = {<Layout/>}>
        <Route path="/workFlows" element={<WorkFlows />} />
        <Route path="/" element = {<Home/>}/>
      </Route>
    </Routes>
   </>
  )
}

export default App
