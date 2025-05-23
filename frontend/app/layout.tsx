import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import clsx from "clsx";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          fontSans.variable,
          "h-screen bg-background bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed font-sans antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}