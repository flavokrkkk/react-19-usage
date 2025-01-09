import { use, useOptimistic } from "react";
import { IUser } from "../../../entities/user/types/types";
import { createUserAction, deleteUserAction } from "../libs/actions/actions";
import { useUsersCtx } from "../../../entities/user/libs/userCtx";

export const useUser = () => {
  const { users: usersPromise, refetchUsers } = useUsersCtx();

  const [createdUsers, optimisticCreate] = useOptimistic(
    [] as Array<IUser>,
    (createdUsers, user: IUser) => [...createdUsers, user]
  );
  const [deleteUsers, optimisticDelete] = useOptimistic(
    [] as Array<IUser["id"]>,
    (deleteUsers, userId: IUser["id"]) => deleteUsers.concat(userId)
  );

  const useUsersOptimistic = () => {
    const users = use(usersPromise);
    return users
      .concat(createdUsers)
      .filter((user) => !deleteUsers.includes(user.id));
  };

  return {
    usersPromise: useUsersOptimistic,
    createUserAction: createUserAction({
      refetchUsers,
      optimisticUpdate: optimisticCreate,
    }),
    deleteUserAction: deleteUserAction({
      refetchUsers,
      optimisticUpdate: optimisticDelete,
    }),
  } as const;
};
