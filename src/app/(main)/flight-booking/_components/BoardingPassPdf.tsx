"use client";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { BookingDetails } from "@/types/boarding.pass";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    backgroundColor: "#f8fafc",
    fontFamily: "Helvetica",
    color: "#172033",
  },
  card: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
  },
  heading: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 22,
  },
  bookingCode: {
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#eff6ff",
    borderRadius: 6,
  },
  label: {
    fontSize: 9,
    color: "#64748b",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    fontWeight: 700,
  },
  route: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottom: "1px solid #e2e8f0",
    marginBottom: 16,
  },
  airport: {
    width: "40%",
  },
  airportCode: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 5,
  },
  airportName: {
    fontSize: 9,
    color: "#64748b",
  },
  routeMiddle: {
    width: "20%",
    alignItems: "center",
  },
  routeLine: {
    width: "100%",
    borderBottom: "1px solid #94a3b8",
    marginVertical: 7,
  },
  smallText: {
    fontSize: 9,
    color: "#64748b",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 12,
    marginBottom: 10,
  },
  passenger: {
    padding: 12,
    marginBottom: 8,
    border: "1px solid #e2e8f0",
    borderRadius: 6,
  },
  passengerName: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 7,
  },
  passengerInfo: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 5,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  detail: {
    width: "50%",
    paddingVertical: 9,
  },
  qrSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid #e2e8f0",
  },
  qr: {
    width: 100,
    height: 100,
  },
  footer: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 20,
    textAlign: "center",
  },
});

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

interface BoardingPassPdfProps {
  booking: BookingDetails;
  qrCodeDataUrl: string;
}

export function BoardingPassPdf({
  booking,
  qrCodeDataUrl,
}: BoardingPassPdfProps) {
  const flight = booking.flight;

  return (
    <Document
      title={`Boarding pass ${booking.booking_code}`}
      author="Safarni"
      subject="Flight booking confirmation"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.heading}>Boarding pass</Text>
          <Text style={styles.subtitle}>
            Safarni flight booking confirmation
          </Text>

          <View style={styles.bookingCode}>
            <Text style={styles.label}>BOOKING REFERENCE</Text>
            <Text style={styles.value}>{booking.booking_code}</Text>
          </View>

          <View style={styles.route}>
            <View style={styles.airport}>
              <Text style={styles.airportCode}>
                {flight.origin.airport_code}
              </Text>
              <Text style={styles.airportName}>
                {flight.origin.airport_name}
              </Text>
              <Text style={styles.smallText}>{flight.departure_time}</Text>
            </View>

            <View style={styles.routeMiddle}>
              <Text style={styles.smallText}>
                {formatDuration(flight.duration_minutes)}
              </Text>
              <View style={styles.routeLine} />
              <Text style={styles.smallText}>{flight.flight_number}</Text>
            </View>

            <View style={[styles.airport, { alignItems: "flex-end" }]}>
              <Text style={styles.airportCode}>
                {flight.destination.airport_code}
              </Text>
              <Text style={[styles.airportName, { textAlign: "right" }]}>
                {flight.destination.airport_name}
              </Text>
              <Text style={styles.smallText}>{flight.arrival_time}</Text>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detail}>
              <Text style={styles.label}>AIRLINE</Text>
              <Text style={styles.value}>{flight.airline.name}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>FLIGHT DATE</Text>
              <Text style={styles.value}>
                {formatDate(flight.departure_date)}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>TERMINAL</Text>
              <Text style={styles.value}>{flight.terminal || "—"}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>GATE</Text>
              <Text style={styles.value}>{flight.gate || "—"}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>BOOKING STATUS</Text>
              <Text style={styles.value}>{booking.status.toUpperCase()}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>TOTAL PRICE</Text>
              <Text style={styles.value}>
                ${Number(booking.total_price).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Passengers</Text>

          {booking.passengers.map((passenger) => (
            <View key={passenger.passenger_id} style={styles.passenger}>
              <Text style={styles.passengerName}>{passenger.full_name}</Text>
              <Text style={styles.passengerInfo}>
                Age: {passenger.age} · Gender: {passenger.gender}
              </Text>
              <Text style={styles.passengerInfo}>
                Seat: {passenger.seat} · Ticket: $
                {Number(passenger.ticket_price).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.qrSection}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.label}>BOOKING QR CODE</Text>
              <Text style={styles.value}>{booking.booking_code}</Text>
              <Text style={[styles.smallText, { marginTop: 7 }]}>
                Keep this booking reference for your records.
              </Text>
            </View>

            {qrCodeDataUrl ? (
              <Image src={qrCodeDataUrl} style={styles.qr} />
            ) : null}
          </View>
        </View>

        <Text style={styles.footer}>
          Booking confirmation generated by Safarni. Check with the airline for
          ticketing and boarding requirements.
        </Text>
      </Page>
    </Document>
  );
}
