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
      <body className={`${geist.className} bg-[#f8f9fb]`}>
        <div className="max-w-[390px] mx-auto min-h-screen bg-white relative">
          <main className="pb-28">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
