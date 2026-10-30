import { Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type Status = "success" | "failed";

const content = {
  success: {
    title: "Payment Successful!",
    message: "Thank you for your trust",
    circle: "bg-green-500",
    Icon: Check,
  },
  failed: {
    title: "Payment Failed!",
    message: "Something went wrong. Please try again.",
    circle: "bg-[#F05252]",
    Icon: X,
  },
} as const;

export default function PaymentStatus({ status }: { status: Status }) {
  const { title, message, circle, Icon } = content[status];

  return (
    <div className="flex flex-col items-center bg-white px-10 pt-28">
      <div
        className={`flex h-13 w-13 items-center justify-center rounded-full ${circle}`}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={3} />
      </div>

      <h1 className="mt-6 text-2xl font-medium text-[#111827]">{title}</h1>
      <p className="mt-3 text-base text-gray-500">{message}</p>

      <div className="mt-6 flex w-full justify-center  max-w-md gap-3">
        <Link href="/">
          <Button>Back To Home</Button>
        </Link>
      </div>
    </div>
  );
}
