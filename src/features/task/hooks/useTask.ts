import { startTransition, useState } from "react";
import { fetchTask } from "../../../entities/task/libs/taskService";
import { createTaskAction, deleteTaskAction } from "../libs/actions/actions";

export const useTask = (id: string) => {
  const [tasksPromise, setTasksPromise] = useState(() =>
    fetchTask({ filters: { userId: id } })
  );
  const [page, setPage] = useState(1);

  const onChangePage = (page: number) => {
    setPage(page);
    setTasksPromise(fetchTask({ filters: { userId: id }, page }));
  };

  const refetchTasks = () => {
    startTransition(() =>
      setTasksPromise(fetchTask({ filters: { userId: id } }))
    );
  };

  return {
    page,
    tasksPromise,
    onChangePage,
    deleteTaskAction: deleteTaskAction({ refetch: refetchTasks }),
    createTaskAction: createTaskAction({ refetch: refetchTasks, userId: id }),
  };
};
