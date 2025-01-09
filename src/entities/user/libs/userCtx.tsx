import {
  createContext,
  FC,
  PropsWithChildren,
  startTransition,
  use,
  useState,
} from "react";
import { IUser } from "../types/types";
import { fetchUsers } from "./userService";

type UserContextType = {
  users: Promise<Array<IUser>>;
  refetchUsers: () => void;
};

const UsersContext = createContext<UserContextType | null>(null);

const defaultUsers = fetchUsers();
export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [usersPromise, setUsersPromise] =
    useState<Promise<Array<IUser>>>(defaultUsers);

  const refetchUsers = () => {
    startTransition(() => setUsersPromise(fetchUsers()));
  };

  return (
    <UsersContext value={{ users: usersPromise, refetchUsers }}>
      {children}
    </UsersContext>
  );
};

export const useUsersCtx = () => {
  const ctx = use(UsersContext);

  if (!ctx) throw new Error("useUsersCtx must be used within a UsersProvider!");

  return ctx;
};
