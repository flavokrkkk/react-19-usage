import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TaskForm from "../../../features/task/ui/taskForm";
import TaskList from "../../../features/task/ui/taskList";
import { useParams } from "react-router-dom";
import { useTask } from "../../../features/task/hooks/useTask";
import UserReview from "../../../features/user/ui/userReview";
import TaskPaginate from "../../../features/task/ui/taskPaginate";

const TaskPage = () => {
  const { id } = useParams();
  const {
    search,
    tasksPromise,
    onChangePage,
    onChangeSearch,
    deleteTaskAction,
    createTaskAction,
  } = useTask(id ?? "");

  return (
    <div className="space-y-6">
      <div className="text-center">
        Tasks user -{" "}
        <Suspense>
          <UserReview userId={id} />
        </Suspense>
      </div>
      <TaskForm action={createTaskAction} />
      <div className="flex gap-2">
        <input
          placeholder="Search..."
          type="text"
          value={search}
          className="border p-2 rounded"
          onChange={onChangeSearch}
        />
        <select className="border p-2 rounded">
          <option value="all">All</option>
          <option value="completed">New to Old</option>
          <option value="incompleted">Old to New</option>
        </select>
      </div>
      <ErrorBoundary
        fallbackRender={(e) => <div>There was an error! {e.error}</div>}
      >
        <Suspense
          fallback={
            <div className="border rounded-full border-dashed w-5 h-5 border-white animate-spin" />
          }
        >
          <TaskList tasksPromise={tasksPromise} action={deleteTaskAction} />
          <TaskPaginate
            onPageChange={onChangePage}
            tasksPaginated={tasksPromise}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TaskPage;
