// eslint-disable-next-line import/order
import { fontSans } from '@/config/fonts';

import '@/styles/globals.css';
import clsx from 'clsx';

import { Providers } from './provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          fontSans.variable,
          'bg-background bg-gradient-to-b from-black to-red-950 bg-center bg-fixed bg-cover font-sans antialiased w-screen h-screen overflow-hidden',
        )}
      >
        <Providers>
          <div className="w-screen h-screen flex items-center justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
