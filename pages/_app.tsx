import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {wrapper} from "../store";
import {useRouter} from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import {ChakraProvider} from "@chakra-ui/react";

const publicRoutes = ["/signup", "/login"]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
      <ChakraProvider>
          {publicRoutes.includes(router.pathname) ? (
              <Component {...pageProps} />
          ) : (
              <ProtectedRoute>
                  <Component {...pageProps} />
              </ProtectedRoute>
          )}
      </ChakraProvider>
  )
}

export default wrapper.withRedux(MyApp)
