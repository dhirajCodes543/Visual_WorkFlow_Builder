import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Features/workflowSlice";

const store = configureStore({
    reducer:reducer
});

store.subscribe(()=>{
    localStorage.setItem("workFlows",JSON.stringify(store.getState()))
})

export default store;