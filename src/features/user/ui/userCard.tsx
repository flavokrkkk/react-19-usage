import { FC, useActionState } from "react";
import { IUser } from "../../../entities/user/types/types";
import { DeleteActionState, DeleteUserAction } from "../libs/actions/actions";

interface IUserCard {
  user: IUser;
  action: DeleteUserAction<DeleteActionState>;
}

const UserCard: FC<IUserCard> = ({ user, action }) => {
  const [state, handleDelete, isPending] = useActionState(action, {});

  return (
    <div
      key={user.id}
      className="p-5 flex justify-between items-center cursor-pointer border bg-rose-100 border-rose-600 rounded-lg"
    >
      <h4>{user.email}</h4>
      <form action={handleDelete}>
        <input type="hidden" name="userId" value={user.id} />
        <button
          type="submit"
          disabled={isPending}
          value={user.id}
          className="p-2 flex justify-center px-5 border bg-rose-400 border-rose-600 rounded-lg"
        >
          Удалить
        </button>
      </form>
      {state.error && <span className="text-red-500">{state.error}</span>}
    </div>
  );
};

export default UserCard;
