import { Main } from "@components/layouts";
import favApple from "@public/fav/apple-touch-icon.png";
import fav16 from "@public/fav/favicon-16x16.png";
import fav32 from "@public/fav/favicon-32x32.png";
import favIco from "@public/fav/favicon.ico";
import favSafari from "@public/fav/safari-pinned-tab.svg";
import "@styles/index.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href={favIco.src} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content="Welcome to my personal website! I'm a Senior Front-End Developer, Mentor, and Teacher dedicated to crafting engaging web experiences. Explore my portfolio."
        />
        <link rel="apple-touch-icon" sizes="180x180" href={favApple.scr} />
        <link rel="icon" type="image/png" sizes="32x32" href={fav32.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={fav16.src} />
        <link rel="mask-icon" href={favSafari.src} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000" />
        <title>Dark Site | Andrian Karsanashvili</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
