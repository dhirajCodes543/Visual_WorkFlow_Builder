import React from "react";

function TaskCard({
  task,
  availableTasks,
  onDependenciesChange,
}) {
  const selectedDependencyIds = task.dependsOnTaskIds || [];

  const handleDependencyChange = (dependencyId) => {
    let updatedDependencyIds;

    if (selectedDependencyIds.includes(dependencyId)) {
      updatedDependencyIds = selectedDependencyIds.filter(
        (id) => id !== dependencyId
      );
    } else {
      updatedDependencyIds = [
        ...selectedDependencyIds,
        dependencyId,
      ];
    }

    onDependenciesChange(task.id, updatedDependencyIds);
  };

  const dependencyTasks = availableTasks.filter((availableTask) =>
    selectedDependencyIds.includes(availableTask.id)
  );

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {task.name}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            task.isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-700">
          Depends on
        </h3>

        {availableTasks.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">
            No other tasks are available.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {availableTasks.map((availableTask) => (
              <label
                key={availableTask.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={selectedDependencyIds.includes(
                    availableTask.id
                  )}
                  onChange={() =>
                    handleDependencyChange(availableTask.id)
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-700">
                  {availableTask.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-700">
          Selected dependencies
        </h3>

        {dependencyTasks.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">
            This task has no dependencies.
          </p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {dependencyTasks.map((dependencyTask) => (
              <span
                key={dependencyTask.id}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
              >
                {dependencyTask.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default TaskCard;