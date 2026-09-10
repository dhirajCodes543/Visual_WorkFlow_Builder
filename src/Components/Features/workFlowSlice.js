import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    WorkFlow: [],
    Tasks: []
}

export const workFlowDataSlice = createSlice({
    name: "workFlowData",
    initialState,
    reducers: {
        addAllData: (state, action) => {
            const data = action.payload;

            state.WorkFlow = data?.WorkFlow || [];
            state.Tasks = data?.Tasks || [];
        },
        addWorkFlow: (state, action) => {
            const data = action.payload;

            if (Object.keys(data).length > 0) {
                state.WorkFlow = [...state.WorkFlow, data];
            }
        },
        addTasks: (state, action) => {
            const data = action.payload;

            if (Object.keys(data).length > 0) {
                state.Tasks = [...state.Tasks, data];
            }
        },
        removeTasks: (state, action) => {
            const taskId = action.payload;

            state.Tasks = state.Tasks.filter((task) => (
                task.id !== taskId
            ))
        },
        removeWorkFlow: (state, action) => {
            const workFlowId = action.payload;

            state.WorkFlow = state.WorkFlow.filter((workflow) => (
                workflow.id !== workFlowId
            ))

            state.Tasksasks = state.Tasks.filter(
                (task) => task.workFlowId !== workFlowId
            );
        },
        updateTaskDependencies: (state, action) => {
            const { taskId, dependsOnTaskIds } = action.payload;

            const task = state.Tasks.find(
                (task) => task.id === taskId
            );

            if (task) {
                task.dependsOnTaskIds = dependsOnTaskIds;
            }
        },
    }
})

export const { addAllData, updateTaskDependencies, addWorkFlow, addTasks, removeTasks, removeWorkFlow } = workFlowDataSlice.actions

export default workFlowDataSlice.reducer;