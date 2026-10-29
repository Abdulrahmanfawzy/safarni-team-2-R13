import { bookingRoomSchema } from "@/schemas/bookingRoom.schema";
import z from "zod";

export type BookingRoomPayload = z.infer<typeof bookingRoomSchema>;

export type DateOption = { value: string; weekday: string; label: string };
