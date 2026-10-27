"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  BookingPassenger,
  CreateBookingPayload,
  FlightSeat,
  PassengerGender,
} from "@/types/flight.seat";
import { createFlightBooking } from "@/actions/booking.actions";

interface PassengerFormValues {
  passengers: BookingPassenger[];
}

interface PassengerFieldArrayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flightId: number;
  seats: FlightSeat[];
}

function createPassenger(seat: FlightSeat): BookingPassenger {
  return {
    full_name: "",
    age: 18,
    gender: "male",
    passport_number: "",
    seat_id: seat.id,
  };
}

export function PassengerFieldArray({
  open,
  onOpenChange,
  flightId,
  seats,
}: PassengerFieldArrayProps) {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormValues>({
    defaultValues: {
      passengers: seats.map(createPassenger),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = async (values: PassengerFormValues) => {
    setServerError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const payload: CreateBookingPayload = {
      flight_id: flightId,
      passengers: values.passengers.map((passenger) => ({
        ...passenger,
        age: Number(passenger.age),
        seat_id: Number(passenger.seat_id),
      })),
    };

    try {
      const result = await createFlightBooking(payload);

      if (!result.success) {
        setServerError(result.message);
        return;
      }

      setSuccessMessage(result.message);
    } catch {
      setServerError("Unable to submit the booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isSubmitting) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent
        showCloseButton
        className="fixed inset-y-0 right-0 left-auto top-0 h-dvh w-full max-w-lg translate-x-0 translate-y-0 overflow-y-auto rounded-none rounded-l-xl p-0 sm:max-w-lg"
      >
        <div className="p-5 sm:p-7">
          <DialogHeader className="mb-5 pr-8">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Passenger details
            </DialogTitle>
            <DialogDescription>
              Enter the passenger information for each selected seat.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {fields.map((field, index) => {
              const passengerErrors = errors.passengers?.[index];

              return (
                <section
                  key={field.id}
                  className="space-y-4 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-gray-900">
                      Passenger {index + 1}
                    </h3>
                    <span className="rounded bg-blue-50 px-2 py-1 text-sm font-medium text-[#1e429f]">
                      Seat {seats[index]?.seat_number}
                    </span>
                  </div>

                  <input
                    type="hidden"
                    {...register(`passengers.${index}.seat_id`, {
                      valueAsNumber: true,
                    })}
                  />

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`passenger-${index}-name`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Full name
                    </label>
                    <Input
                      id={`passenger-${index}-name`}
                      autoComplete="name"
                      placeholder="Enter full name"
                      {...register(`passengers.${index}.full_name`, {
                        required: "Full name is required.",
                        validate: (value) =>
                          value.trim().length > 0 || "Full name is required.",
                      })}
                      aria-invalid={Boolean(passengerErrors?.full_name)}
                    />
                    {passengerErrors?.full_name?.message && (
                      <p className="text-xs text-red-600">
                        {passengerErrors.full_name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor={`passenger-${index}-age`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>
                      <Input
                        id={`passenger-${index}-age`}
                        type="number"
                        min={1}
                        max={120}
                        {...register(`passengers.${index}.age`, {
                          valueAsNumber: true,
                          required: "Age is required.",
                          min: {
                            value: 1,
                            message: "Age must be at least 1.",
                          },
                          max: {
                            value: 120,
                            message: "Enter a valid age.",
                          },
                        })}
                        aria-invalid={Boolean(passengerErrors?.age)}
                      />
                      {passengerErrors?.age?.message && (
                        <p className="text-xs text-red-600">
                          {passengerErrors.age.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor={`passenger-${index}-gender`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id={`passenger-${index}-gender`}
                        className="h-11 w-full rounded-sm border border-gray-300 bg-transparent px-2.5 text-sm outline-none focus-visible:border-app-primary focus-visible:ring-3 focus-visible:ring-app-primary/15"
                        {...register(`passengers.${index}.gender`, {
                          required: "Gender is required.",
                          validate: (value): value is PassengerGender =>
                            value === "male" || value === "female",
                        })}
                        aria-invalid={Boolean(passengerErrors?.gender)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {passengerErrors?.gender?.message && (
                        <p className="text-xs text-red-600">
                          {passengerErrors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`passenger-${index}-passport`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Passport number
                    </label>
                    <Input
                      id={`passenger-${index}-passport`}
                      autoComplete="off"
                      placeholder="Enter passport number"
                      {...register(`passengers.${index}.passport_number`, {
                        required: "Passport number is required.",
                        validate: (value) =>
                          value.trim().length > 0 ||
                          "Passport number is required.",
                      })}
                      aria-invalid={Boolean(passengerErrors?.passport_number)}
                    />
                    {passengerErrors?.passport_number?.message && (
                      <p className="text-xs text-red-600">
                        {passengerErrors.passport_number.message}
                      </p>
                    )}
                  </div>
                </section>
              );
            })}

            {serverError && (
              <p role="alert" className="text-sm text-red-600">
                {serverError}
              </p>
            )}

            {successMessage && (
              <p role="status" className="text-sm text-green-700">
                {successMessage}
              </p>
            )}

            <div className="sticky bottom-0 space-y-3 border-t border-gray-100 bg-white py-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || seats.length === 0}
                isLoading={isSubmitting}
              >
                Book Seats
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
