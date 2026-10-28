export default async function ServerDataFetcher<T>({
  fetcherFun,
  children,
}: {
  fetcherFun: () => Promise<T>;
  children: (payload: T) => React.ReactNode;
}) {
  const payload = await fetcherFun();
  return <>{children(payload)}</>;
}
