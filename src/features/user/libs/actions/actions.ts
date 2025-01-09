import {
  createUser,
  deleteUser,
} from "../../../../entities/user/libs/userService";

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
  }: {
    refetchUsers: () => void;
  }): CreateUserAction<CreateActionState> =>
  async (_, formData): Promise<CreateActionState> => {
    try {
      const email = String(formData.get("email"));

      if (!email.length) {
        return {
          error: "Invalid email!",
        };
      }

      await createUser({
        id: crypto.randomUUID(),
        email: email,
      });
      refetchUsers();
      formData.delete("email");
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
  }: {
    refetchUsers: () => void;
  }): DeleteUserAction<DeleteActionState> =>
  async (_, formData): Promise<DeleteActionState> => {
    const userId = String(formData.get("userId"));
    try {
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
