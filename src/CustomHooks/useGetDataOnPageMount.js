import { useEffect, useState } from "react";
import { addAllData } from "../Components/Features/workflowSlice";
import { useDispatch } from "react-redux";

const useGetDataOnPageMount = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const data = localStorage.getItem("workFlows");

        if(data){
            dispatch(addAllData(JSON.parse(data)))
        }
    },[])
}

export { useGetDataOnPageMount };