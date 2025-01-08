import { Suspense, useState } from "react";
import { IUser } from "../../../entities/user/types/types";
import UserList from "../../../features/user/ui/userList";
import UserForm from "../../../features/user/ui/userForm";
import { fetchUsers } from "../../../entities/user/libs/userService";
import { ErrorBoundary } from "react-error-boundary";

const defaultUsers = fetchUsers();

const UserPage = () => {
  const [users, setUsers] = useState<Promise<Array<IUser>>>(defaultUsers);

  const refetchUsers = () => {
    setUsers(fetchUsers());
  };

  return (
    <div className="space-y-6">
      <h1 className="text-center">Users</h1>
      <UserForm refetchUsers={refetchUsers} />
      <ErrorBoundary
        fallbackRender={(e) => <div>There was an error! {e.error}</div>}
      >
        <Suspense
          fallback={
            <div className="border rounded-full border-dashed w-5 h-5 border-white animate-spin" />
          }
        >
          <UserList usersPromise={users} refetchUsers={refetchUsers} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UserPage;
