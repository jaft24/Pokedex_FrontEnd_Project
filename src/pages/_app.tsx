import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { Container } from "react-bootstrap";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/hooks/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/pokedex_logo.ico" />
      </Head>
      <div>
        <main>
          <Container
            style={{
              minWidth: "482px",
              minHeight: "1100px",
              backgroundImage: "url('/background_image.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <ChakraProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </ChakraProvider>
          </Container>
        </main>
      </div>
    </>
  );
}
