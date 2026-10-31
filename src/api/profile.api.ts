import { getAccessToken } from "../lib/getAccessToken";
import { ApiResponse } from "../types/global.type";
import { ProfileBooking, ProfileResponse } from "../types/profile.type";

// profile Info
export async function getProfileApi(): Promise<ApiResponse<ProfileResponse>> {
  const token = await getAccessToken();
  const res = await fetch(`${process.env.API}/profile/show`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    next: {
      revalidate: 60,
      tags: ["profiel-info"],
    },
  });
  const data = await res.json();

  if (!res.ok) throw new Error(`Failed to fetch profile (${data.message})`);

  return data;
}
// profile booking
export async function getProfileBookingsApi(
  service_type: "tours" | "hotels" | "flights" | "cars",
): Promise<ApiResponse<ProfileBooking[]>> {
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.API}/profile/bookings?service_type=${service_type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  const data = await res.json();

  if (!res.ok)
    throw new Error(`Failed to fetch profile bookings (${data.mesage})`);
  return data;
}

export async function updateProfileApi(bodyData: Record<string, unknown>) {
  const token = await getAccessToken();
  const res = await fetch(`${process.env.API}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) throw new Error(`Failed to update profile (${res.status})`);
  return res.json();
}

export async function updateAccountSecurityApi(securityData: {
  biometric?: boolean;
  faceId?: boolean;
}) {
  const token = await getAccessToken();
  const res = await fetch(`${process.env.API}/profile/security`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(securityData),
  });

  if (!res.ok)
    throw new Error(`Failed to update security settings (${res.status})`);
  return res.json();
}

export async function deleteAccountApi() {
  const token = await getAccessToken();

  const res = await fetch(`${process.env.API}/profile/account`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to delete account (${res.status})`);
  return res.json();
}

export async function updateLanguageApi(lang: string) {
  const token = await getAccessToken();
  const res = await fetch(`${process.env.API}/profile/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ language: lang }),
  });

  if (!res.ok) throw new Error(`Failed to update language (${res.status})`);
  return res.json();
}
