import { startTransition, useState } from "react";
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

  return {
    usersPromise,
    createUserAction: createUserAction({ refetchUsers }),
    deleteUserAction: deleteUserAction({ refetchUsers }),
  } as const;
};
