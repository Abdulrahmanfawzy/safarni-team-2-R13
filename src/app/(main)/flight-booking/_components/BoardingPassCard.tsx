"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Armchair, Plane, Download, LoaderCircle } from "lucide-react";
import { FlightIllustration } from "./FlightIllustration";
import { BoardingPassPdf } from "./BoardingPassPdf";
import { Button } from "@/components/ui/button";
import type { BookingDetails } from "@/types/boarding.pass";

const BOOKING_STORAGE_KEY = "safarni.latestFlightBooking";

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

function formatPrice(value: string): string {
  const price = Number(value);

  return Number.isFinite(price) ? `$${price.toFixed(2)}` : value;
}

export function BoardingPassCard() {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const storedBooking = sessionStorage.getItem(BOOKING_STORAGE_KEY);

      if (!storedBooking) {
        setError(
          "No booking details were found. Complete a flight booking first.",
        );
        return;
      }

      const parsed = JSON.parse(storedBooking) as BookingDetails;

      if (
        !parsed.booking_code ||
        !parsed.flight ||
        !Array.isArray(parsed.passengers)
      ) {
        setError("The saved booking details are incomplete.");
        return;
      }

      setBooking(parsed);
    } catch {
      setError("Unable to read the saved booking details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!booking?.booking_code) {
      return;
    }

    let cancelled = false;

    QRCode.toDataURL(booking.booking_code, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 320,
      color: {
        dark: "#111827",
        light: "#FFFFFF",
      },
    })
      .then((dataUrl) => {
        if (!cancelled) {
          setQrCodeDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Unable to generate the booking QR code.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [booking]);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <p className="text-sm text-gray-500">Loading boarding pass...</p>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <h1 className="text-xl font-semibold text-gray-900">
          Boarding pass unavailable
        </h1>
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error || "Booking details are unavailable."}
        </p>
        <Button
          type="button"
          className="mt-5"
          onClick={() => {
            window.location.href = "/flight-booking";
          }}
        >
          Return to flight booking
        </Button>
      </main>
    );
  }

  const flight = booking.flight;

  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-10 lg:px-10">
      <section className="min-w-0">
        <FlightIllustration />
      </section>

      <section className="mx-auto w-full max-w-[345px]">
        <h1 className="mb-5 text-center text-[18px] font-semibold tracking-tight text-[#172033]">
          Boarding pass
        </h1>

        <article className="relative overflow-hidden rounded-[15px] border border-gray-100 bg-white shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
          <div className="h-[6px] rounded-full bg-gradient-to-r from-[#7185ad] via-[#c3cde0] to-[#7185ad]" />

          <div className="px-3 pb-4 pt-3">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                {flight.airline.logo_url ? (
                  <Image
                    src={flight.airline.logo_url}
                    alt={`${flight.airline.name} logo`}
                    width={28}
                    height={28}
                    unoptimized
                    className="size-7 rounded-full object-contain"
                  />
                ) : (
                  <span className="flex size-7 items-center justify-center rounded-full border border-blue-200 text-[#1e429f]">
                    <Plane size={14} />
                  </span>
                )}

                <span className="min-w-0 text-[10px] font-medium text-[#172033]">
                  {flight.airline.name}
                </span>
              </div>

              <span className="shrink-0 text-right text-[10px] text-[#172033]">
                {formatDate(flight.departure_date)}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_0.65fr_1fr] items-start gap-2">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#172033]">
                  {flight.departure_time}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-gray-500">
                  {flight.origin.airport_code}
                </p>
                <p className="mt-1 text-[9px] text-gray-500">
                  {flight.origin.airport_name}
                </p>
              </div>

              <div className="flex flex-col items-center pt-1">
                <Plane size={12} className="text-[#172033]" />
                <span className="mt-1 text-center text-[9px] text-gray-500">
                  {formatDuration(flight.duration_minutes)}
                </span>
              </div>

              <div className="min-w-0 text-right">
                <p className="text-[14px] font-semibold text-[#172033]">
                  {flight.arrival_time}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-gray-500">
                  {flight.destination.airport_code}
                </p>
                <p className="mt-1 text-[9px] text-gray-500">
                  {flight.destination.airport_name}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-y-3 border-y border-gray-200 py-3 text-center sm:grid-cols-4">
              <div>
                <p className="text-[11px] text-gray-500">
                  {flight.gate || "—"}
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Gate
                </p>
              </div>

              <div>
                <p className="text-[11px] text-gray-500">
                  {booking.passengers
                    .map((passenger) => passenger.seat)
                    .join(", ")}
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Seat
                </p>
              </div>

              <div>
                <p className="text-[11px] text-gray-500">
                  {flight.terminal || "—"}
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Terminal
                </p>
              </div>

              <div>
                <p className="text-[11px] text-gray-500">
                  {flight.flight_number}
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Flight
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {booking.passengers.map((passenger) => (
                <div
                  key={passenger.passenger_id}
                  className="flex items-center gap-2 border border-[#1685ff] px-2 py-2"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f4eee8] text-xs font-semibold text-gray-600">
                    {passenger.avatar_url ? (
                      <Image
                        src={passenger.avatar_url}
                        alt={passenger.full_name}
                        width={32}
                        height={32}
                        unoptimized
                        className="size-8 rounded-full object-cover"
                      />
                    ) : (
                      passenger.full_name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium text-[#172033]">
                      {passenger.full_name}
                    </p>
                    <p className="mt-0.5 text-[9px] text-gray-500">
                      {passenger.age} years, {passenger.gender}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500">
                    <Armchair
                      size={13}
                      className="text-[#1e429f]"
                      aria-hidden="true"
                    />
                    <span className="text-[10px]">{passenger.seat}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 rounded-md bg-slate-50 p-2">
              <div className="min-w-0">
                <p className="text-[9px] text-gray-500">Booking reference</p>
                <p className="break-all text-[11px] font-semibold text-[#172033]">
                  {booking.booking_code}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[9px] text-gray-500">Status</p>
                <p className="text-[10px] font-semibold capitalize text-amber-700">
                  {booking.status}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-gray-500">
                {booking.passengers_count} passenger(s)
              </span>
              <span className="font-semibold text-[#1e429f]">
                Total: {formatPrice(booking.total_price)}
              </span>
            </div>

            <div className="flex justify-center pt-5 pb-1">
              {qrCodeDataUrl ? (
                <Image
                  src={qrCodeDataUrl}
                  alt={`QR code for booking ${booking.booking_code}`}
                  width={164}
                  height={164}
                  unoptimized
                  className="size-36"
                />
              ) : (
                <div className="flex size-36 items-center justify-center">
                  <LoaderCircle className="size-6 animate-spin text-gray-400" />
                </div>
              )}
            </div>

            <p className="mt-2 text-center text-[9px] text-gray-500">
              Scan the QR code to read the booking reference.
            </p>
          </div>
        </article>

        <div className="mt-4 space-y-2">
          {qrCodeDataUrl ? (
            <PDFDownloadLink
              document={
                <BoardingPassPdf
                  booking={booking}
                  qrCodeDataUrl={qrCodeDataUrl}
                />
              }
              fileName={`boarding-pass-${booking.booking_code}.pdf`}
              className="flex h-[38px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#2447a5] px-4 text-[13px] font-semibold text-white transition hover:bg-[#1e429f]"
            >
              {({ loading }) =>
                loading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Preparing PDF...
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    Download boarding pass PDF
                  </>
                )
              }
            </PDFDownloadLink>
          ) : (
            <Button type="button" disabled className="w-full">
              Preparing QR code...
            </Button>
          )}

          <p className="text-center text-[10px] text-gray-500">
            Booking confirmation only. Confirm ticket issuance with the airline.
          </p>
        </div>
      </section>
    </main>
  );
}
