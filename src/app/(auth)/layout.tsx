import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left branding panel - hidden on mobile */}
      <section className="hidden lg:flex flex-col justify-between bg-dark-900 text-light-100 p-10">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange"
          >
            <Image src="/logo.svg" alt="Nike" width={22} height={22} />
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-heading-2 font-bold">Just Do It</h2>
          <p className="max-w-md text-lead text-light-300">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>
          {/* Carousel dots */}
          <div className="flex gap-2 pt-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-light-100" />
            <span className="h-2.5 w-2.5 rounded-full bg-light-100/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-light-100/40" />
          </div>
        </div>

        <p className="text-footnote text-light-400">
          &copy; {new Date().getFullYear()} Nike. All rights reserved.
        </p>
      </section>

      {/* Right form panel */}
      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 bg-light-100">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
