import { FC, use, useCallback, useTransition } from "react";
import { IUser } from "../../../entities/user/types/types";
import UserCard from "./userCard";
import { deleteUser } from "../../../entities/user/libs/userService";

interface IUserList {
  usersPromise: Promise<Array<IUser>>;
  refetchUsers: () => void;
}

const UserList: FC<IUserList> = ({ usersPromise, refetchUsers }) => {
  const [isPending, startTransition] = useTransition();
  //достаем из промиса наши данные
  const users = use(usersPromise);

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!event.currentTarget.value) throw new Error("Произошла ошибка!");
      startTransition(async () => {
        await deleteUser(event.currentTarget.value);
        startTransition(() => refetchUsers());
      });
    },
    []
  );

  return (
    <section className="flex flex-col space-y-2">
      {users.map((user) => (
        <UserCard
          key={user.id}
          isPending={isPending}
          user={user}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default UserList;
