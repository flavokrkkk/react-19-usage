import { createUser } from "../../../../entities/user/libs/userService";

type CreateActionState = {
  defaulEmail?: string;
  error?: string;
};

export const creaetUserAction =
  ({ refetchUsers }: { refetchUsers: () => void }) =>
  async (
    prevState: CreateActionState,
    formData: FormData
  ): Promise<CreateActionState> => {
    try {
      const email = formData.get("email")?.toString() ?? "";

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
