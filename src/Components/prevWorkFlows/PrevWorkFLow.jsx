import { useSelector } from "react-redux";
import WorkFlowCard from "./WorkFlowCard";
import { useNavigate } from "react-router-dom";

function WorkFlows() {
    const navigate = useNavigate();

    const workFlows = useSelector(
        (state) => state.WorkFlow
    );

    const tasks = useSelector(
        (state) => state.Tasks
    );

    const handleOpenWorkFlow = (workFlowId) => {
        navigate(`/workFlow/${workFlowId}`);
    };


    return (
        <main className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Workflows
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Select a workflow to view and manage its tasks.
                    </p>
                </div>

                {workFlows.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            No workflows found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first workflow to get started.
                        </p>
                    </div>
                ) : (
                    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {workFlows.map((workFlow) => {
                            const numberOfTasks = tasks.filter(
                                (task) => task.workFlowId === workFlow.id
                            ).length;

                            return (
                                <WorkFlowCard
                                    key={workFlow.id}
                                    workFlow={workFlow}
                                    numberOfTasks={numberOfTasks}
                                    onOpen={handleOpenWorkFlow}
                                />
                            );
                        })}
                    </section>
                )}
            </div>
        </main>
    );
}

export default WorkFlows;