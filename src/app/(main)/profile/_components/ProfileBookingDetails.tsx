import type { LucideIcon } from "lucide-react";
import type { ProfileBooking } from "@/types/profile.type";

interface ProfileBookingDetailsProps {
  booking: ProfileBooking;
  category: string;
  icon: LucideIcon;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export default function ProfileBookingDetails({
  booking,
  category,
  icon: Icon,
}: ProfileBookingDetailsProps) {
  return (
    <article className="border border-rose-200/80 rounded-2xl p-5 hover:border-rose-300 transition-all bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-slate-800">
          <Icon className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold">{category}</h2>
        </div>
        <span className="text-xs text-slate-500">{booking.status}</span>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
        <div>
          <dt className="text-slate-400">Booking code</dt>
          <dd className="font-semibold text-slate-800">{booking.booking_code}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Booking ID</dt>
          <dd className="font-semibold text-slate-800">{booking.id}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Start date</dt>
          <dd className="font-semibold text-slate-800">
            {formatDate(booking.start_at)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-400">End date</dt>
          <dd className="font-semibold text-slate-800">
            {formatDate(booking.end_at)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-400">Service item</dt>
          <dd className="font-semibold text-slate-800">
            {booking.service_item_id}
          </dd>
        </div>
        <div>
          <dt className="text-slate-400">Total</dt>
          <dd className="font-semibold text-slate-800">
            {booking.total_amount} {booking.currency}
          </dd>
        </div>
        <div>
          <dt className="text-slate-400">Adults</dt>
          <dd className="font-semibold text-slate-800">{booking.adults}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Children</dt>
          <dd className="font-semibold text-slate-800">{booking.children}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Infants</dt>
          <dd className="font-semibold text-slate-800">{booking.infants}</dd>
        </div>
        {booking.notes && (
          <div className="col-span-2">
            <dt className="text-slate-400">Notes</dt>
            <dd className="font-semibold text-slate-800">{booking.notes}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
