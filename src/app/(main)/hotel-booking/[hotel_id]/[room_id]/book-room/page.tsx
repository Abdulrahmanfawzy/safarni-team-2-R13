"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "../../../_components/roomDetails/DatePicker";
import { useParams } from "next/navigation";

const CHECK_IN = [
  { id: "in-1", weekday: "Today", label: "4 Oct" },
  { id: "in-2", weekday: "Tue", label: "6 Oct" },
  { id: "in-3", weekday: "Wed", label: "7 Oct" },
  { id: "in-4", weekday: "Wed", label: "7 Oct" },
];

const CHECK_OUT = [
  { id: "out-1", weekday: "Sun", label: "3 Nov" },
  { id: "out-2", weekday: "Mon", label: "4 Nov" },
  { id: "out-3", weekday: "Wed", label: "5 Nov" },
  { id: "out-4", weekday: "Wed", label: "5 Nov" },
];

export default function BookHotel() {
  const { hotel_id, room_id } = useParams();

  return (
    <form className="flex w-full  flex-col gap-3 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-xl font-medium text-blue-800">
          Book Room
        </h1>
      </div>

      <section className="flex flex-col gap-1">
        <Label className="text-base font-normal text-slate-800">Check In</Label>
        <DatePicker options={CHECK_IN} />
      </section>

      <section className="flex flex-col gap-1">
        <Label className="text-base font-normal text-slate-800">
          Check Out
        </Label>
        <DatePicker options={CHECK_OUT} />
      </section>

      <section className="flex flex-col gap-1.5">
        <Label htmlFor="note" className="text-base font-normal text-slate-800">
          Note To Owner
        </Label>
        <Textarea
          id="note"
          placeholder="Enter here"
          className="h-36 resize-none rounded-md border-0 bg-slate-100 p-3 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-blue-800"
        />
      </section>

      <Button
        type="submit"
        className="h-11 w-full rounded-md bg-blue-800 text-base font-medium text-white hover:bg-blue-900"
      >
        Submit
      </Button>
    </form>
  );
}
