"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl"
      />

      <section className="relative w-full max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/6 shadow-2xl shadow-indigo-950/40">
          <svg
            aria-hidden="true"
            className="h-10 w-10 text-indigo-300"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 8v4m0 4h.01M10.3 3.9 1.8 18.5A1.7 1.7 0 0 0 3.3 21h17.4a1.7 1.7 0 0 0 1.5-2.5L13.7 3.9a2 2 0 0 0-3.4 0Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
          Something went wrong
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          We hit a little snag.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
          The page couldn’t load right now. Please try again, and we’ll get you
          back on track.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 7v5h-5M4.9 9a7.5 7.5 0 0 1 12.6-2L20 12M4 17v-5h5m10.1 3a7.5 7.5 0 0 1-12.6 2L4 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Try again
        </button>
      </section>
    </main>
  );
};

export default ErrorPage;
