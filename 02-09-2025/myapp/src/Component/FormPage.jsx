import { Input } from "@/components/ui/input";
import React from "react";
import Calender28 from "./Calender28";
import Calendar24 from "./Calender24";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

//partial shadcn component
const FormPage = () => {
  return (
    <form className="text-white min-w-sm flex gap-2 flex-col ">
      <p className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        Name
      </p>
      <div className="flex flex-row gap-2">
        <Input type="text" placeholder="Text" className="bg-background" />
        <Input type="text" placeholder="Text" className="bg-background" />
      </div>

      <div className="flex  flex-col gap-2 ">
        <Calender28 />
        <Calendar24 />
      </div>

      {/* input area */}
      <div className="grid w-full gap-2">
        <Label htmlFor="message-2">Message</Label>
        <Textarea placeholder="enter your message" id="message-2" />
        <Button>Send</Button>
      </div>
    </form>
  );
};

export default FormPage;
