const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API;

export interface UserProfileData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface UserBooking {
  id: number;
  booking_code: string;
  title: string;
  status: string;
  price: string | number;
  date: string;
}


export async function getProfileApi(token: string) {
  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);
  return res.json();
}

export async function updateProfileApi(token: string, bodyData: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) throw new Error(`Failed to update profile (${res.status})`);
  return res.json();
}


export async function getProfileBookingsApi(token: string) {
  const res = await fetch(`${API_URL}/profile/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch bookings (${res.status})`);
  return res.json();
}

export async function updateAccountSecurityApi(token: string, securityData: { biometric?: boolean; faceId?: boolean }) {
  const res = await fetch(`${API_URL}/profile/security`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(securityData),
  });

  if (!res.ok) throw new Error(`Failed to update security settings (${res.status})`);
  return res.json();
}

export async function deleteAccountApi(token: string) {
  const res = await fetch(`${API_URL}/profile/account`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to delete account (${res.status})`);
  return res.json();
}

export async function updateLanguageApi(token: string, lang: string) {
  const res = await fetch(`${API_URL}/profile/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ language: lang }),
  });

  if (!res.ok) throw new Error(`Failed to update language (${res.status})`);
  return res.json();
}