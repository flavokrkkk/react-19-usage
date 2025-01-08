import { FC } from "react";
import { IUser } from "../../../entities/user/types/types";

interface IUserCard {
  isPending: boolean;
  user: IUser;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserCard: FC<IUserCard> = ({ user, isPending, onDelete }) => {
  return (
    <div
      key={user.id}
      className="p-5 flex justify-between items-center cursor-pointer border bg-rose-100 border-rose-600 rounded-lg"
    >
      <h4>{user.email}</h4>
      <button
        type="submit"
        disabled={isPending}
        value={user.id}
        className="p-2 flex justify-center px-5 border bg-rose-400 border-rose-600 rounded-lg"
        onClick={onDelete}
      >
        Удалить
      </button>
    </div>
  );
};

export default UserCard;
