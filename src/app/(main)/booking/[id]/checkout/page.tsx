import { Suspense } from "react";
import CheckoutClient from "./_components/CheckoutClient";

async function CheckoutContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CheckoutClient id={id} />;
}

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <CheckoutContent params={params} />
    </Suspense>
  );
}