import { CurrencyProvider } from "@/contexts/CurrencyContext";
import BottomNav from "@/components/BottomNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <main className="pb-28">{children}</main>
      <BottomNav />
    </CurrencyProvider>
  );
}
