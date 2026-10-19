import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <div className="m-10 space-x-3">
      <Button>Base</Button>

      <Button variant="outline">outline</Button>

      <Button variant="secondary" className={"rounded-full size-12"}>
        <ArrowLeft className="size-5" />
      </Button>

      <Button variant="link">link</Button>
    </div>
  );
};

export default page;
