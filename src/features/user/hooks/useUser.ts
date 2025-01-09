import { startTransition, use, useOptimistic, useState } from "react";
import { fetchUsers } from "../../../entities/user/libs/userService";
import { IUser } from "../../../entities/user/types/types";
import { createUserAction, deleteUserAction } from "../libs/actions/actions";

const defaultUsers = fetchUsers();

export const useUser = () => {
  const [usersPromise, setUsersPromise] =
    useState<Promise<Array<IUser>>>(defaultUsers);

  const refetchUsers = () => {
    startTransition(() => setUsersPromise(fetchUsers()));
  };

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
