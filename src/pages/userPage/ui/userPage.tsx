import { Suspense } from "react";
import UserList from "../../../features/user/ui/userList";
import UserForm from "../../../features/user/ui/userForm";
import { ErrorBoundary } from "react-error-boundary";
import { useUser } from "../../../features/user/hooks/useUser";

const UserPage = () => {
  const { refetchUsers, usersPromise } = useUser();

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
          <UserList usersPromise={usersPromise} refetchUsers={refetchUsers} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UserPage;
