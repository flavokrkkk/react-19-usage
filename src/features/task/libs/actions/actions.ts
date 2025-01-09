import {
  createTask,
  deleteTask,
} from "../../../../entities/task/libs/taskService";
import { ITask } from "../../../../entities/task/types/types";

export type CreateActionState = {
  message?: string;
  error?: string;
};

export type DeleteActionState = {
  message?: string;
  error?: string;
};
export type DeleteTaskAction<T> = (state: T, formData: FormData) => Promise<T>;

export type CreateTaskAction<T> = (state: T, formData: FormData) => Promise<T>;

export const deleteTaskAction =
  ({ refetch }: { refetch: () => void }): DeleteTaskAction<DeleteActionState> =>
  async (_, formData): Promise<DeleteActionState> => {
    try {
      const taskId = formData.get("taskId")?.toString() ?? "";
      if (!taskId.length) {
        return {
          error: "TaskId is empty!",
        };
      }
      await deleteTask(taskId);
      formData.delete("taskId");
      refetch();
      return {
        message: "Task deleted successfully!",
      };
    } catch (err) {
      return {
        message: (err as Error).message,
      };
    }
  };

export const createTaskAction =
  ({
    refetch,
    userId,
  }: {
    refetch: () => void;
    userId: string;
  }): CreateTaskAction<CreateActionState> =>
  async (_, formData): Promise<CreateActionState> => {
    try {
      const title = formData.get("title")?.toString() ?? "";
      if (!title.length) {
        return {
          error: "Invalid title!",
        };
      }
      const newTasks: ITask = {
        id: String(crypto.randomUUID()),
        isDone: false,
        title: title,
        createdAt: Date.now(),
        userId,
      };
      formData.delete("title");
      await createTask(newTasks);
      refetch();
      return {
        message: "Task created successfully!",
      };
    } catch (err) {
      return {
        message: (err as Error).message,
      };
    }
  };
