import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2">Hello from About!</div>;
}

// function RouteComponent() {
//   return <div>Hello "/about"!</div>
// }
