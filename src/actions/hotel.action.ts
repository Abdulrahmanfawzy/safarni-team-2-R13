"use server";

import { getAccessToken } from "@/lib/getAccessToken";
import { BookingRoomPayload } from "@/types/bookingRoom.type";

export interface BookingRoomRequest {
  room_id: string;
  body: BookingRoomPayload;
}

export async function bookingRoom(payload: BookingRoomRequest) {
  const token = await getAccessToken();

  try {
    const response = await fetch(
      `${process.env.API}/hotels/rooms/${payload.room_id}/bookings`,
      {
        method: "POST",
        body: JSON.stringify({ ...payload.body }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
          "Idempotency-Key": `Idempotency-Key-${payload.room_id}`,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const errors = data.errors
        ? Object.values(data.errors).flat().join("\n")
        : null;
      throw new Error(`Failed to fetch Bookin room: ${errors || data.message}`);
    }

    return data;
  } catch (error) {
    console.error("hotels Rooms:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function checkoutBookingRoom(room_id: string) {
  const token = await getAccessToken();

  try {
    const response = await fetch(
      `${process.env.API}/hotels/bookings/${room_id}/checkout-session`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
          "Idempotency-Key": `Idempotency-Key-${room_id}`,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const errors = data.errors
        ? Object.values(data.errors).flat().join("\n")
        : null;
      throw new Error(
        `Failed to fetch checkout Bookin room: ${errors || data.message}`,
      );
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
