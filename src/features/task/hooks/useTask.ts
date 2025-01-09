import { startTransition, useState } from "react";
import { fetchTask } from "../../../entities/task/libs/taskService";
import { createTaskAction, deleteTaskAction } from "../libs/actions/actions";

export const useTask = (id: string) => {
  const [tasksPromise, setTasksPromise] = useState(() =>
    fetchTask({ filters: { userId: id } })
  );
  const refetchTasks = () => {
    startTransition(() =>
      setTasksPromise(fetchTask({ filters: { userId: id } }))
    );
  };

  return {
    createTaskAction: createTaskAction({ refetch: refetchTasks, userId: id }),
    deleteTaskAction: deleteTaskAction({ refetch: refetchTasks }),
    tasksPromise,
  };
};
