import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import { updateTaskDependencies } from "../Features/workFlowSlice.js";

function WorkFlowDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const workFlows = useSelector(
    (state) => state.WorkFlow
  );

  const allTasks = useSelector(
    (state) => state.Tasks
  );

  const selectedWorkFlow = workFlows.find(
    (workFlow) => workFlow.id === id
  );

  const workFlowTasks = allTasks.filter(
    (task) => task.workFlowId === id
  );

  const handleDependenciesChange = (
    taskId,
    updatedDependencyIds
  ) => {
    dispatch(
      updateTaskDependencies({
        taskId,
        dependsOnTaskIds: updatedDependencyIds,
      })
    );
  };

  if (!selectedWorkFlow) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Workflow not found
          </h1>

          <p className="mt-2 text-gray-500">
            The requested workflow does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedWorkFlow.name}
          </h1>

          <p className="mt-2 text-gray-600">
            {workFlowTasks.length}{" "}
            {workFlowTasks.length === 1 ? "task" : "tasks"}
          </p>
        </header>

        {workFlowTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No tasks found
            </h2>

            <p className="mt-2 text-gray-500">
              Add tasks to this workflow first.
            </p>
          </div>
        ) : (
          <section className="grid gap-5 md:grid-cols-2">
            {workFlowTasks.map((task) => {
              const availableTasks = workFlowTasks.filter(
                (availableTask) => availableTask.id !== task.id
              );

              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  availableTasks={availableTasks}
                  onDependenciesChange={
                    handleDependenciesChange
                  }
                />
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default WorkFlowDetails;