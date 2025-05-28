import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          fontSans.variable,
          "min-h-screen w-full bg-background bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed font-sans antialiased"
        )}
      >
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
