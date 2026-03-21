import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 bg-background border-b border-gray-200">
      <Link href="/" className="font-bold text-lg">
        Alpha Desk
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm hover:underline">
          Home
        </Link>
        <Link
          href="/login"
          className="text-sm px-4 py-1.5 rounded-md bg-foreground text-background hover:opacity-80"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
