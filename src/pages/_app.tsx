import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Container } from "react-bootstrap";
import Head from "next/head";

//This variable isn't used at all
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/pokedex_logo.ico" />
      </Head>

      <div>
        <main>
          <Container
            style={{
              maxWidth: "1700px",
              minWidth: "356px",
            }}
          >
            <Component {...pageProps} />
          </Container>
        </main>
      </div>
    </>
  );
}
