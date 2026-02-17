import type { Metadata } from "next";
import React, { ReactNode } from "react";
import "./globals.css";
import Header from "./header/header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-slate-50">
          
          <aside className="w-64 fixed bg-white border-r">
            <Header />
          </aside>

          <main className="flex-1 ml-64">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}