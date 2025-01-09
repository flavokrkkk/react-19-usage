import { RouterProvider } from "react-router-dom";
import { UsersProvider } from "../../entities/user/libs/userCtx";
import { routes } from "../../pages/routes";

const Providers = () => {
  return (
    <UsersProvider>
      <RouterProvider router={routes} />
    </UsersProvider>
  );
};

export default Providers;
