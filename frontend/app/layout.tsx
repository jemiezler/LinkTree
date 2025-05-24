import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import clsx from "clsx";
import { Providers } from "./provider";

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
          "flex justify-center items-center bg-background bg-[url('/bg.png')] bg-center bg-fixed font-sans antialiased "
        )}
      >
        <Providers >
          {children}
        </Providers>
      </body>
    </html>
  );
}
