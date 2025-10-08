import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
});

// function RootComponent() {
//   return (
//     <React.Fragment>
//       <div>Hello "__root"!</div>
//       <Outlet />
//     </React.Fragment>
//   );
// }
