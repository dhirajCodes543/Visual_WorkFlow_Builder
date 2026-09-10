function WorkFlowCard({
  workFlow,
  numberOfTasks,
  onOpen
}) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">
        {workFlow.name}
      </h2>

      <p className="mt-2 text-gray-500">
        {numberOfTasks} {numberOfTasks === 1 ? "task" : "tasks"}
      </p>

      <button
        type="button"
        onClick={() => onOpen(workFlow.id)}
        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        View workflow
      </button>
    </article>
  );
}

export default WorkFlowCard;