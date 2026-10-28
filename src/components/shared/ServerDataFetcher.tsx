interface ServerDataFetcherProps<T> {
  fetcherFn: () => Promise<T>;
  children: (payload: T) => React.ReactNode;
}

export default async function ServerDataFetcher<T>({
  fetcherFn,
  children,
}: ServerDataFetcherProps<T>) {
  const payload = await fetcherFn();

  return <>{children(payload)}</>;
}
