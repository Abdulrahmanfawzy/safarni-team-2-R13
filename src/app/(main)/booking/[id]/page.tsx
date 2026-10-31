import { Suspense } from "react";
import BookingLoader from "./_components/BookingLoader";

async function BookingContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BookingLoader id={id} />;
}

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <Suspense fallback={null}>
        <BookingContent params={params} />
      </Suspense>
    </main>
  );
}