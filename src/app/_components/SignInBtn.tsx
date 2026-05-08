import Link from "next/link";

export default function SignInBtn() {
  return (
    <Link
      className="inline-block py-2 px-4 rounded-full bg-background hover:bg-background-secondary border border-background-secondary-border"
      href="/auth/signin"
    >
      Sign In / Sign Up
    </Link>
  );
}
