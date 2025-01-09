import { FC, use } from "react";
import { IUser } from "../../../entities/user/types/types";
import UserCard from "./userCard";
import { DeleteActionState, DeleteUserAction } from "../libs/actions/actions";

interface IUserList {
  usersPromise: Promise<Array<IUser>>;
  action: DeleteUserAction<DeleteActionState>;
}

const UserList: FC<IUserList> = ({ usersPromise, action }) => {
  const users = use(usersPromise);

  return (
    <section className="flex flex-col space-y-2">
      {users.map((user) => (
        <UserCard key={user.id} user={user} action={action} />
      ))}
    </section>
  );
};

export default UserList;
