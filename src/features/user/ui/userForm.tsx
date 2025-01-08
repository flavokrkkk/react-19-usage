import { ChangeEvent, FC, useActionState, useState } from "react";
import { creaetUserAction } from "../libs/actions/actions";

interface IUserForm {
  refetchUsers: () => void;
}

const UserForm: FC<IUserForm> = ({ refetchUsers }) => {
  const [email, setEmail] = useState("");

  const [state, dispatch, isPending] = useActionState(
    creaetUserAction({ refetchUsers, setEmail }),
    { defaulEmail: "" }
  );

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <section>
      <form action={dispatch} className="flex flex-col space-y-2">
        <input
          name="email"
          value={email}
          disabled={isPending}
          placeholder="Введите email.."
          className="outline-none p-3 px-5 border border-rose-600 rounded-lg"
          onChange={handleChangeEmail}
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
