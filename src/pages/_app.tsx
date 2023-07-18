import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "react-bootstrap";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/pokedex_logo.ico" />
      </Head>

      {/* Use Media Query for Desktop and Phone minWidth to run the same background */}
      <div>
        <main>
          <Container
            style={{
              maxWidth: "1400px",
              minWidth: "356px",
              minHeight: "1100px",
              backgroundImage: "url('/background_image.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </Container>
        </main>
      </div>
    </>
  );
}
