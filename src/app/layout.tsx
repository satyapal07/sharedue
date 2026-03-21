import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharedue",
  description: "Shared expense tracking without the subscription bloat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 antialiased`}>
        <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-sm">
          <main className="pb-20">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
