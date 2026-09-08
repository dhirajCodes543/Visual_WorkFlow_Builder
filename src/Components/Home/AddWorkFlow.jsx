import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWorkFlow } from "../Features/workflowSlice";

function AddWorkflow() {
  const [workflowName, setWorkflowName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!workflowName.trim()) return;

    const newWorkflow = {
      id: crypto.randomUUID(),
      name: workflowName.trim(),
    };

    dispatch(addWorkFlow(newWorkflow));
    setWorkflowName("");
  };

  return (
    <section className="p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Create Workflow</h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={workflowName}
          onChange={(event) => setWorkflowName(event.target.value)}
          placeholder="Enter workflow name"
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Workflow
        </button>
      </form>
    </section>
  );
}

export default AddWorkflow;