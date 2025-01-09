import { FC, useActionState } from "react";
import { creaetUserAction } from "../libs/actions/actions";

interface IUserForm {
  refetchUsers: () => void;
}

const UserForm: FC<IUserForm> = ({ refetchUsers }) => {
  const [state, dispatch, isPending] = useActionState(
    creaetUserAction({ refetchUsers }),
    { defaulEmail: "" }
  );

  return (
    <section>
      <form action={dispatch} className="flex flex-col space-y-2">
        <input
          name="email"
          disabled={isPending}
          placeholder="Введите email.."
          className="outline-none p-3 px-5 border border-rose-600 rounded-lg"
        />
        {state.error && state.error}
        <button
          type="submit"
          disabled={isPending}
          className="p-2 flex justify-center px-5 border bg-rose-400 border-rose-600 rounded-lg"
        >
          {isPending ? (
            <div className="border rounded-full border-dashed w-5 h-5 border-white animate-spin" />
          ) : (
            "Add"
          )}
        </button>
      </form>
    </section>
  );
};
export default UserForm;
