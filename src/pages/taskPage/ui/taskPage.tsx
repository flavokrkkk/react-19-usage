import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TaskForm from "../../../features/task/ui/taskForm";
import TaskList from "../../../features/task/ui/taskList";
import { useParams } from "react-router-dom";
import { useTask } from "../../../features/task/hooks/useTask";

const TaskPage = () => {
  const { id } = useParams();
  const { createTaskAction, deleteTaskAction, tasksPromise } = useTask(
    id ?? ""
  );

  return (
    <div className="space-y-6">
      <h1 className="text-center">Tasks user {id}</h1>
      <TaskForm action={createTaskAction} />
      <ErrorBoundary
        fallbackRender={(e) => <div>There was an error! {e.error}</div>}
      >
        <Suspense
          fallback={
            <div className="border rounded-full border-dashed w-5 h-5 border-white animate-spin" />
          }
        >
          <TaskList tasksPromise={tasksPromise} action={deleteTaskAction} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TaskPage;
