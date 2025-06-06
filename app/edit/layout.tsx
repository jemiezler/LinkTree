import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div
        suppressHydrationWarning
        className={clsx(
          fontSans.variable,
          "min-h-screen w-full bg-background bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed font-sans antialiased"
        )}
      >
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          {children}
        </div>
      </div>
  );
}
