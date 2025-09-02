import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ButtonPage from "./Component/ButtonPage";
import ChartPage from "./Component/ChartPage";
import CardPage from "./Component/CardPage";
import FormPage from "./Component/FormPage";
import { toast } from "sonner";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import Alert from "./Component/Alert";

function App() {
  const [click, setClick] = useState(false);

  return (
    <>
      <Toaster position="top-center" />

      <div className=" h-full w-full gap-5 flex flex-col ">
        <ButtonPage />
        <ChartPage />
        <div className="items-center flex flex-col gap-5 ">
          <CardPage />
          <FormPage />
        </div>

        {/* toast demo */}
        <Button onClick={() => toast("Message sent")}>BUTTON</Button>

        {/* Alert demo */}
        <Button onClick={() => setClick(true)}>Alert?</Button>
        {click && <Alert data={click} />}
      </div>
    </>
  );
}

export default App;
