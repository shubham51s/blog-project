export default function NoInternetPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-[7%] py-[6%]">
      <section className="w-full max-w-[720px] text-center">
        {/* Icon */}
        <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 ring-1 ring-sky-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-9 w-9 text-sky-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M2 9.5a15 15 0 0 1 20 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-900 sm:text-[2.4rem]">No internet connection</h1>

        {/* Divider */}
        <div className="mx-auto my-8 h-px w-[18%] min-w-[90px] bg-neutral-200" />

        {/* Description */}
        <div className="space-y-4 text-[1rem] leading-8 text-neutral-600 sm:text-[1.08rem]">
          <p>It looks like your device is offline.</p>

          <p>Please check your internet connection and refresh the page once you're back online.</p>
        </div>

        {/* Footer */}
        <p className="mt-14 text-sm text-neutral-400">We'll reconnect automatically when your network is available.</p>
      </section>
    </main>
  );
}
