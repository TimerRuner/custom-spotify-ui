import React, {FC, useEffect, useState} from "react"
import {useTypeSelector} from "../hooks/useSelector";
import {useActions} from "../hooks/actionCreator";
import {useRouter} from "next/router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Text, Box, Button, Flex, FormControl, FormLabel, Input, Link} from "@chakra-ui/react";
import Cookies from 'js-cookie';
import getGoogleUrl from "../utils/getGoogleUrl";

const LoginForm: FC = () => {
  const {login, loginGoogle} = useActions()
  const router = useRouter()
  const {isAuth} = useTypeSelector(store => store.auth)
  useEffect(() => {
      if(isAuth){
          router.push('/')
      }
  }, [isAuth])

  useEffect(() => {
      const refreshToken = localStorage.getItem("token")

      const data = Cookies.get("user")
      const user = JSON.parse(data || "{}")
      if(user?.accessToken || user?.user){
          loginGoogle(user.accessToken, user.user)
      }
      return () => {
          if(!refreshToken) return Cookies.remove("user")
      }
  }, [])

    const validation = (values: {email: string, password: string}) => {
        const errors: {email?: string, password?: string} = {};

        if (!values.email) {
            errors.email = 'Email is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    return (
        <Box width="100vw" height="100vh">
            <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
                <Box width="336px" height="auto">
                    <Formik
                        initialValues={{ email: "", password: ""}}
                        validate={validation}
                        onSubmit={
                            (values, actions) => {
                                login(values.email, values.password)
                            }
                        }
                    >
                        <Form>
                            <Flex flexDirection="column">
                                <FormControl id="email" mb={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Field name="email" type="email" as={Input} palceholder="Enter email"/>
                                    <ErrorMessage name="email" render={msg => <Text color="red">{msg}</Text>}/>
                                </FormControl>
                                <FormControl id="email" mb={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Field type="password" as={Input} name="password" palceholder="Enter password"/>
                                    <ErrorMessage name="password" render={msg => <Text color="red">{msg}</Text>}/>
                                </FormControl>
                                <Flex gap="15px" justifyContent="space-around">
                                    <Button type="submit" minW="150px">Login</Button>
                                </Flex>
                                <Button gap="15px" mt={5} onClick={() => router.push(getGoogleUrl())}>
                                    Google
                                </Button>
                            </Flex>
                        </Form>
                    </Formik>
                </Box>
            </Flex>
        </Box>
    )
}

export default LoginForm
