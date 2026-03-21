'use client';

import NavBar from '@/ui/layout/NavBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="pt-14">{children}</main>
    </>
  );
}
