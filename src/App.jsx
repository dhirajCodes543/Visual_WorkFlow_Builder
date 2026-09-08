import { Router,Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import { useGetDataOnPageMount } from "./CustomHooks/useGetDataOnPageMount"
import Home from "./Components/Home/Home";

function App() {
  useGetDataOnPageMount();

  return (
   <>
    <Routes>
      <Route path="/" element = {<Layout/>}>
        <Route path="/" element = {<Home/>}/>
      </Route>
    </Routes>
   </>
  )
}

export default App
