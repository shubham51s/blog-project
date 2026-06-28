export default function AppErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-[7%] py-[6%]">
      <section className="w-full max-w-[720px] text-center">
        {/* Icon */}
        <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 ring-1 ring-amber-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-9 w-9 text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5m0 3h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-900 sm:text-[2.4rem]">Something went wrong</h1>

        {/* Divider */}
        <div className="mx-auto my-8 h-px w-[18%] min-w-[90px] bg-neutral-200" />

        {/* Description */}
        <div className="space-y-4 text-[1rem] leading-8 text-neutral-600 sm:text-[1.08rem]">
          <p>We're unable to load the application right now.</p>

          <p>Please refresh the page and try again. If the problem persists, the service may be temporarily unavailable.</p>
        </div>

        {/* Footer text */}
        <p className="mt-14 text-sm text-neutral-400">Thank you for your patience.</p>
      </section>
    </main>
  );
}
