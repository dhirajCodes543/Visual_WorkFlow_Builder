import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTasks } from "../Features/workflowSlice";

function AddTask() {
  const [showWorkflowList, setShowWorkflowList] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState("");
  const [taskName, setTaskName] = useState("");

  
  const [dependsOnTaskIds, setDependsOnTaskIds] = useState([]);

  const dispatch = useDispatch();

  const WorkFlow = useSelector(state => state.WorkFlow);
  const Tasks = useSelector(state => state.Tasks);

  const filteredWorkflows = WorkFlow.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedWorkflow = WorkFlow.find(
    (workflow) => workflow.id === selectedWorkflowId
  );

  const workflowTasks = Tasks.filter(
    (task) => task.workFlowId === selectedWorkflowId
  );

  const handleWorkflowSelect = (workflowId) => {
    setSelectedWorkflowId(workflowId);
    setTaskName("");
    setDependsOnTaskIds([]);
  };

  const handleDependencyChange = (taskId) => {
    setDependsOnTaskIds((previousIds) => {
      const isAlreadySelected = previousIds.includes(taskId);

      if (isAlreadySelected) {
        return previousIds.filter((id) => id !== taskId);
      }

      return [...previousIds, taskId];
    });
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    if (!taskName.trim() || !selectedWorkflowId) return;

    const newTask = {
      id: crypto.randomUUID(),
      name: taskName.trim(),
      workFlowId: selectedWorkflowId,
      dependsOnTaskIds,
    };

    dispatch(addTasks(newTask));

    setTaskName("");
    setDependsOnTaskIds([]);
  };

  const selectedDependencyTasks = workflowTasks.filter((task) =>
    dependsOnTaskIds.includes(task.id)
  );

  return (
    <section className="p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Create Task</h2>

      <button
        type="button"
        onClick={() => setShowWorkflowList((previous) => !previous)}
        className="px-5 py-2 text-white bg-green-600 rounded-lg"
      >
        {showWorkflowList ? "Close" : "Add Task"}
      </button>

      {showWorkflowList && (
        <div className="mt-5">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search workflows"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
          />

          <div className="space-y-2">
            {filteredWorkflows.map((workflow) => (
              <button
                key={workflow.id}
                type="button"
                onClick={() => handleWorkflowSelect(workflow.id)}
                className={`w-full px-4 py-3 text-left border rounded-lg ${
                  selectedWorkflowId === workflow.id
                    ? "border-blue-600 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                {workflow.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedWorkflow && (
        <form onSubmit={handleTaskSubmit} className="mt-6 space-y-4">
          <p className="font-medium">
            Adding task to:{" "}
            <span className="text-blue-600">
              {selectedWorkflow.name}
            </span>
          </p>

          <input
            type="text"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            placeholder="Enter task name"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div>
            <p className="mb-2 font-medium">Depends on</p>

            {workflowTasks.length === 0 ? (
              <p className="text-sm text-gray-500">
                This workflow has no previous tasks.
              </p>
            ) : (
              <div className="space-y-2">
                {workflowTasks.map((task) => (
                  <label
                    key={task.id}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={dependsOnTaskIds.includes(task.id)}
                      onChange={() =>
                        handleDependencyChange(task.id)
                      }
                    />

                    <span>{task.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Show selected dependency tasks */}
          {selectedDependencyTasks.length > 0 && (
            <div>
              <p className="mb-2 font-medium">
                Selected dependencies:
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedDependencyTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() =>
                      handleDependencyChange(task.id)
                    }
                    className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full"
                  >
                    {task.name} ×
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2 text-white bg-blue-600 rounded-lg"
          >
            Save Task
          </button>
        </form>
      )}
    </section>
  );
}

export default AddTask;