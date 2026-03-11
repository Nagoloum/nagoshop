import Image from "next/image";

type Props = { variant?: "sign-in" | "sign-up" };

const providers = [
  { name: "Google", icon: "/google.svg" },
  { name: "Apple", icon: "/apple.svg" },
] as const;

export default function SocialProviders({ variant = "sign-in" }: Props) {
  const action = variant === "sign-in" ? "Continue" : "Sign up";

  return (
    <div className="space-y-3">
      {providers.map(({ name, icon }) => (
        <button
          key={name}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body-medium text-dark-900 transition-colors hover:bg-light-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-900/20"
          aria-label={`${action} with ${name}`}
        >
          <Image src={icon} alt="" width={18} height={18} aria-hidden="true" />
          <span>{action} with {name}</span>
        </button>
      ))}
    </div>
  );
}
