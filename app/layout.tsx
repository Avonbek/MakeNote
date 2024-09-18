import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  title: {
    default: "AI Notes App",
    template: `%s | AI Notes App`,
  },
  description: "An AI-powered note-taking application",
  // ... (update other metadata as needed)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
    //     <ClerkProvider>
    //   <AuthWrapper>
    //   </AuthWrapper>
    // </ClerkProvider>
  );
}
