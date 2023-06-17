import type { NextPage } from 'next'
import MainLayout from "../layout/MainLayout";
import {useTypeSelector} from "../hooks/useSelector";
import {Button, Flex, Heading} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";
import {ERoutes} from "../models/constants/routes";
import {EColor} from "../models/colors/colors";

const Home: NextPage = () => {
  const {user} = useTypeSelector(store => store.auth)
  const router = useRouter()
  return (
      <MainLayout>
       <Flex justifyContent="center" alignItems="center" flexDirection="column">
           <Heading
               as="h1"
               size="4xl"
           >
               {`Hello ${user.fullName}`}
           </Heading>
           <Heading
               as="h4"
           >
               {user && !user.isActivated && `Please activate your account ${user.email}`}
           </Heading>
           <Button bg={EColor.greenLight} mt={4} onClick={() => router.push(ERoutes.TRACKS)}>Go to track</Button>
       </Flex>
      </MainLayout>
  )
}

export default Home
