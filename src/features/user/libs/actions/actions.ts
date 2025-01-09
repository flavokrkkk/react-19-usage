import {
  createUser,
  deleteUser,
} from "../../../../entities/user/libs/userService";
import { IUser } from "../../../../entities/user/types/types";

export type CreateActionState = {
  defaulEmail?: string;
  error?: string;
};

export type DeleteActionState = {
  error?: string | null;
  message?: string;
};

export type CreateUserAction<T> = (state: T, formData: FormData) => Promise<T>;

export const createUserAction =
  ({
    refetchUsers,
    optimisticUpdate,
  }: {
    refetchUsers: () => void;
    optimisticUpdate: (user: IUser) => void;
  }): CreateUserAction<CreateActionState> =>
  async (_, formData): Promise<CreateActionState> => {
    try {
      const email = String(formData.get("email"));

      if (!email.length) {
        return {
          error: "Invalid email!",
        };
      }
      const newUser = {
        id: crypto.randomUUID(),
        email: email,
      };

      optimisticUpdate(newUser);
      await createUser(newUser);
      formData.delete("email");
      refetchUsers();
      return {
        defaulEmail: email,
      };
    } catch (err) {
      return {
        error: (err as Error).message,
      };
    }
  };

export type DeleteUserAction<T> = (state: T, formData: FormData) => Promise<T>;

export const deleteUserAction =
  ({
    refetchUsers,
    optimisticUpdate,
  }: {
    refetchUsers: () => void;
    optimisticUpdate: (id: IUser["id"]) => void;
  }): DeleteUserAction<DeleteActionState> =>
  async (_, formData): Promise<DeleteActionState> => {
    const userId = String(formData.get("userId"));
    try {
      optimisticUpdate(userId);
      await deleteUser(userId);
      refetchUsers();
      return {
        error: null,
        message: "User deleted successfully!",
      };
    } catch (err) {
      return {
        error: (err as Error).message,
        message: "Missing Error!",
      };
    }
  };
