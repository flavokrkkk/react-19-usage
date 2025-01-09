import { ChangeEvent, startTransition, useCallback, useState } from "react";
import { fetchTask } from "../../../entities/task/libs/taskService";
import { createTaskAction, deleteTaskAction } from "../libs/actions/actions";
import { debounce } from "../../../shared/hooks/useDebounce";

export const useTask = (id: string) => {
  const [tasksPromise, setTasksPromise] = useState(() =>
    fetchTask({ filters: { userId: id } })
  );
  const [search, setSearch] = useState("");

  const getTaskOptionPage = useCallback(
    ({ page, title }: { page?: number; title?: string }) => {
      setTasksPromise(fetchTask({ filters: { userId: id, title }, page }));
    },
    [id]
  );

  const onChangePage = async (page: number) => {
    startTransition(() => getTaskOptionPage({ page }));
  };

  const updateTaskDebounced = useCallback(
    debounce((title: string) => {
      startTransition(() => getTaskOptionPage({ title }));
    }, 2000),
    [getTaskOptionPage]
  );

  const refetchTasks = async () => {
    const { page } = await tasksPromise;
    startTransition(() => getTaskOptionPage({ page }));
  };

  const onChangeSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    updateTaskDebounced(event.currentTarget.value);
  }, []);

  return {
    search,
    tasksPromise,
    onChangePage,
    onChangeSearch,
    deleteTaskAction: deleteTaskAction({ refetch: refetchTasks }),
    createTaskAction: createTaskAction({ refetch: refetchTasks, userId: id }),
  };
};
