import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rate Bite - avalie um restaurante",
  description: "Um site para avaliar pratos e qualidade de restaurantes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <RestaurantsContextProvider>{children}</RestaurantsContextProvider>
      </body>
    </html>
  );
}
