import { jsonApiInstance } from "../../../shared/api/queryInstanse";
import { IUser } from "../types/types";

class UserService {
  public async fetchUsers(): Promise<IUser[]> {
    return await jsonApiInstance("users");
  }

  public async createUser(user: IUser) {
    return await jsonApiInstance("users", {
      body: JSON.stringify(user),
      method: "POST",
    });
  }

  public async deleteUser(id: IUser["id"]) {
    return await jsonApiInstance(`users/${id}`, {
      method: "DELETE",
    });
  }
}

export const { fetchUsers, createUser, deleteUser } = new UserService();
