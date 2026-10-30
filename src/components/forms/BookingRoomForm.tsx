"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { BookingRoomPayload, DateOption } from "@/types/bookingRoom.type";
import { Controller, useForm } from "react-hook-form";
import { bookingRoomSchema } from "@/schemas/bookingRoom.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "@/components/ui/field";
import useBookingRoom from "@/hooks/useBookingRoom";
import GuestCounter from "@/app/(main)/hotel-booking/_components/GuestCounter";
import DatePicker from "@/app/(main)/hotel-booking/_components/roomDetails/DatePicker";
import { toast } from "sonner";
import { useMemo } from "react";

const guests = [
  { name: "adults", label: "Adults", description: "Ages 18 Or Above", min: 1 },
  { name: "children", label: "Children", description: "Ages 2-17", min: 0 },
  { name: "infants", label: "Infants", description: "Under Ages 2", min: 0 },
] as const;

export default function BookingRoomForm({
  checkOut,
  checkIn,
}: {
  checkOut: string[];
  checkIn: string[];
}) {
  const checkInOptions: DateOption[] = useMemo(
    () =>
      checkIn.map((i) => {
        return {
          value: i,
          weekday: new Date(i).toLocaleDateString("eg-en", {
            weekday: "short",
          }),
          label: new Date(i).toLocaleDateString("eg-en", {
            day: "numeric",
            month: "short",
          }),
        };
      }),
    [checkIn],
  );

  const checkOutOptions: DateOption[] = useMemo(
    () =>
      checkOut.map((i) => {
        return {
          value: i,
          weekday: new Date(i).toLocaleDateString("eg-en", {
            weekday: "short",
          }),
          label: new Date(i).toLocaleDateString("eg-en", {
            day: "numeric",
            month: "short",
          }),
        };
      }),
    [checkIn],
  );

  const { room_id } = useParams();
  // use form for validation
  const { control, handleSubmit, reset } = useForm<BookingRoomPayload>({
    resolver: zodResolver(bookingRoomSchema),
    defaultValues: {
      check_in: "",
      check_out: "",
      note_to_owner: "",
      adults: 0,
      infants: 0,
      children: 0,
    },
  });

  // call api hook
  const { isPending, mutate } = useBookingRoom();

  const onSubmit = async (values: BookingRoomPayload) => {
    if (room_id) {
      const payload = {
        room_id: Array.isArray(room_id) ? room_id[0] : room_id,
        body: values,
      };

      mutate(payload, {
        onSuccess(data) {
          toast.success(data?.booking?.message);

          if (!data.checkout) {
            toast.success(data?.checkout?.message);
            return;
          }
          reset();
          window.location.href = data.checkout?.data.checkout_url;
        },
        onError(error) {
          console.log("book room ", error);
          toast.error(String(error));
        },
      });
    } else {
      throw new Error("room id not found");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full  flex-col gap-3 bg-white"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-center text-xl font-medium text-blue-800">
          Book Room
        </h1>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-base font-normal text-slate-800">Check In</Label>
        <Controller
          name="check_in"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <DatePicker
                options={checkInOptions}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState?.error && (
                <FieldError className="text-start">
                  {fieldState?.error?.message}
                </FieldError>
              )}
            </>
          )}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-base font-normal text-slate-800">
          Check Out
        </Label>
        <Controller
          name="check_out"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <DatePicker
                options={checkOutOptions}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState?.error && (
                <FieldError className="text-start">
                  {fieldState?.error?.message}
                </FieldError>
              )}
            </>
          )}
        />
      </div>

      <div className="flex flex-col">
        {guests.map(({ name, label, description, min }) => (
          <div key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <GuestCounter
                    label={label}
                    description={description}
                    min={min}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState?.error && (
                    <FieldError className="text-start">
                      {fieldState?.error?.message}
                    </FieldError>
                  )}
                </>
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <Controller
          name="note_to_owner"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Label
                htmlFor="note"
                className="text-base font-normal text-slate-800"
              >
                Note To Owner
              </Label>
              <Textarea
                id="note"
                placeholder="Enter here"
                className="h-36 resize-none rounded-md border-0 bg-slate-100 p-3 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-blue-800"
                {...field}
              />
              {fieldState?.error && (
                <FieldError className="text-start">
                  {fieldState?.error?.message}
                </FieldError>
              )}
            </>
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        className="h-11 w-full rounded-md bg-blue-800 text-base font-medium text-white hover:bg-blue-900"
      >
        Submit
      </Button>
    </form>
  );
}
