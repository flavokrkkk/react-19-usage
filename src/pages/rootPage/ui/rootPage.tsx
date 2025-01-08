import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="px-10">
        <Outlet />
      </div>
    </Suspense>
  );
};

export default RootPage;
