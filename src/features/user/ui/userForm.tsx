import { FC, memo, useActionState } from "react";
import { CreateActionState, CreateUserAction } from "../libs/actions/actions";

interface IUserForm {
  action: CreateUserAction<CreateActionState>;
}

const UserForm: FC<IUserForm> = memo(({ action }) => {
  const [state, dispatch, isPending] = useActionState(action, {
    defaulEmail: "",
  });

  return (
    <section>
      <form action={dispatch} className="flex flex-col space-y-2">
        <input
          name="email"
          disabled={isPending}
          placeholder="Введите email.."
          className="outline-none p-3 px-5 border border-rose-600 rounded-lg"
        />
        {state.error && <span className="text-red-500">{state.error}</span>}
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
});
export default UserForm;
