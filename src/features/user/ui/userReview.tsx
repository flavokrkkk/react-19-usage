import { FC, use, useMemo } from "react";
import { useUsersCtx } from "../../../entities/user/libs/userCtx";

interface IUserReview {
  userId: string | undefined;
}

const UserReview: FC<IUserReview> = ({ userId }) => {
  const { users: usersPromise } = useUsersCtx();

  const currentUsers = useMemo(() => {
    if (!userId) throw new Error(`User id not found!`);
    const users = use(usersPromise);
    const currentIds = users.findIndex((user) => user.id === userId);
    if (!~currentIds)
      throw new Error(`User not found! Check you id on valide!`);
    return users[currentIds];
  }, [usersPromise, userId]);

  return <span>{currentUsers.email.split("@")[0]}</span>;
};

export default UserReview;
