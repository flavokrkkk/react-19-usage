import { jsonApiInstance } from "../../../shared/api/queryInstanse";
import { IApiResponse, ITask } from "../types/types";

export class TaskService {
  public async fetchTask({
    page = 1,
    per_page = 10,
    sort = { createdAt: "asc" },
    filters,
  }: {
    page?: number;
    per_page?: number;

    sort?: {
      createdAt: "asc" | "desc";
    };
    filters: {
      userId: string | undefined;
      title?: string;
    };
  }): Promise<IApiResponse<ITask>> {
    const params = String(
      new URLSearchParams({
        _page: String(page),
        _per_page: String(per_page),
        _sort: sort.createdAt === "asc" ? "createdAt" : "-createdAt",
        userId: filters.userId ?? "",
        title: filters.title ?? "",
      })
    );

    return await jsonApiInstance<IApiResponse<ITask>>(`tasks?${params}`, {
      method: "GET",
    }).then((data) => ({ ...data, page }));
  }

  public async createTask(requestBody: ITask) {
    return await jsonApiInstance("tasks", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
  }

  public async deleteTask(taskId: ITask["id"]) {
    return await jsonApiInstance(`tasks/${taskId}`, {
      method: "DELETE",
    });
  }
}

export const { createTask, fetchTask, deleteTask } = new TaskService();
