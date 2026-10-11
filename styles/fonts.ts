import localFont from "next/font/local";

export const headingFont = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "200 800",
});

export const bodyFont = localFont({
  src: "../node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "200 900",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;
