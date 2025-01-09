import { jsonApiInstance } from "../../../shared/api/queryInstanse";
import { IApiResponse, ITask } from "../types/types";

export class TaskService {
  public async fetchTask({
    page = 1,
    per_page = 10,
    sort = { createdAt: "ask" },
    filters,
  }: {
    page?: number;
    per_page?: number;

    sort?: {
      createdAt: "ask" | "desc";
    };
    filters: {
      userId: string | undefined;
    };
  }): Promise<IApiResponse<ITask>> {
    const params = String(
      new URLSearchParams({
        _page: String(page),
        _per_page: String(per_page),
        _sort: sort.createdAt === "ask" ? "createdAt" : "-createdAt",
        userId: filters.userId ?? "",
      })
    );

    return await jsonApiInstance(`tasks?${params}`, {
      method: "GET",
    });
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
