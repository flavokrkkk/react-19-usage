import { ChangeEvent, startTransition, useCallback, useState } from "react";
import { fetchTask } from "../../../entities/task/libs/taskService";
import { createTaskAction, deleteTaskAction } from "../libs/actions/actions";
import { debounce } from "../../../shared/hooks/useDebounce";

export const useTask = (id: string) => {
  const [tasksPromise, setTasksPromise] = useState(() =>
    fetchTask({ filters: { userId: id } })
  );
  const [search, setSearch] = useState("");
  const [createdAtSorted, setCreatedAtSorted] = useState<"ask" | "desc">("ask");

  const getTaskOptionPage = useCallback(
    ({
      page,
      title,
      sorted = createdAtSorted,
    }: {
      page?: number;
      title?: string;
      sorted?: "ask" | "desc";
    }) => {
      setTasksPromise(
        fetchTask({
          filters: { userId: id, title },
          page,
          sort: {
            createdAt: sorted,
          },
        })
      );
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

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreatedAtSorted(event.target.value as "ask" | "desc");
    startTransition(() =>
      getTaskOptionPage({ sorted: event.target.value as "ask" | "desc" })
    );
  };

  return {
    search,
    tasksPromise,
    createdAtSorted,
    onChangePage,
    onChangeSearch,
    handleChangeSort,
    deleteTaskAction: deleteTaskAction({ refetch: refetchTasks }),
    createTaskAction: createTaskAction({ refetch: refetchTasks, userId: id }),
  };
};
