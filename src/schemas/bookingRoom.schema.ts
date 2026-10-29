import { z } from "zod";

export const bookingRoomSchema = z
  .object({
    check_in: z.string().min(1, "Select a check-in date"),
    check_out: z.string().min(1, "Select a check-out date"),
    note_to_owner: z.string().max(500, "Max 500 characters"),
    adults: z.number().min(1, "At least 1 adult is required").max(10),
    children: z.number().min(0).max(10),
    infants: z.number().min(0).max(5),
  })
  .refine((d) => !d.check_in || !d.check_out || d.check_out > d.check_in, {
    path: ["check_out"],
    message: "Check-out must be after check-in",
  })
  .refine((d) => d.infants <= d.adults, {
    path: ["infants"],
    message: "Each infant needs an adult",
  });
