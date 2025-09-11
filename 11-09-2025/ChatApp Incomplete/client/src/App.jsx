import { Toaster } from "sonner";
import AllRoutes from "./Routes/AllRoutes";

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <AllRoutes />;
    </>
  );
}
