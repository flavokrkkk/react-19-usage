import { FC, useMemo } from "react";
import { IUser } from "../../../entities/user/types/types";
import UserCard from "./userCard";
import { DeleteActionState, DeleteUserAction } from "../libs/actions/actions";

interface IUserList {
  usersPromise: () => IUser[];
  action: DeleteUserAction<DeleteActionState>;
}

const UserList: FC<IUserList> = ({ usersPromise, action }) => {
  const users = useMemo(() => usersPromise(), [usersPromise]);

  return (
    <section className="flex flex-col space-y-2">
      {users.map((user) => (
        <UserCard key={user.id} user={user} action={action} />
      ))}
    </section>
  );
};

export default UserList;
