import React, {FC, useEffect, useState} from "react"
import {useTypeSelector} from "../hooks/useSelector";
import {useActions} from "../hooks/actionCreator";
import {useRouter} from "next/router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Text, Box, Button, Flex, FormControl, FormLabel, Input, Link, Heading, Select} from "@chakra-ui/react";
import {RoleResponse} from "../models/models/AuthResponse";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";

const RegistrationForm: FC = () => {
  const {registration, loginGoogle} = useActions()
  const router = useRouter()
  const {isAuth} = useTypeSelector(store => store.auth)
  const [roles, setRoles] = useState<RoleResponse[]>([])

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

  useEffect(() => {
      AuthService.getAllRoles().then((response) => {
          const rolesData = response.data;
          if (Array.isArray(rolesData)) {
              setRoles(rolesData);
          } else {
              setRoles([rolesData]);
          }
      });
  }, [])
    const validation = (values: {email: string, password: string, fullName: string}) => {
        const errors: {email?: string, password?: string, fullName?: string} = {};

        if (!values.email) {
            errors.email = 'Email is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        if (!values.fullName) {
            errors.fullName = 'Password is required';
        }

        return errors;
    };


    return (
        <Box width="100vw" height="100vh">
            <Flex width="100%" height="100%" justifyContent="center" alignItems="center" flexDirection="column">
                <Heading mb="25px">Sign up Page</Heading>
                <Box width="336px" height="auto">
                    <Formik
                        initialValues={{ email: "", password: "", fullName: "", role: "USER"}}
                        validate={validation}
                        onSubmit={
                            (values, actions) => {
                                registration(values.email, values.password, values.fullName, values.role)
                            }
                        }
                    >
                        <Form>
                            <Flex flexDirection="column">
                                <FormControl id="fullName" mb={4}>
                                    <FormLabel>Full name</FormLabel>
                                    <Field type="text" as={Input} name="fullName" palceholder="Enter full name"/>
                                    <ErrorMessage name="fullName" render={msg => <Text color="red">{msg}</Text>}/>
                                </FormControl>
                                <FormControl id="email" mb={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Field name="email" type="email" as={Input} palceholder="Enter email"/>
                                    <ErrorMessage name="email" render={msg => <Text color="red">{msg}</Text>}/>
                                </FormControl>
                                <FormControl id="password" mb={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Field type="password" as={Input} name="password" palceholder="Enter password"/>
                                    <ErrorMessage name="password" render={msg => <Text color="red">{msg}</Text>}/>
                                </FormControl>
                                <FormControl id="role" mb={4}>
                                    <FormLabel htmlFor="role">Select Role:</FormLabel>
                                    <Field id="role" name="role">
                                        {({ field }: { field: any }) => (
                                            <Select {...field} placeholder="Select a role">
                                                {roles.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </FormControl>
                                <Flex gap="15px" justifyContent="space-around">
                                    <Button type="submit" minW="150px">
                                        Registration
                                    </Button>
                                    <Button>
                                        <Link href="login" minW="150px">Log in</Link>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Form>
                    </Formik>
                </Box>
            </Flex>
        </Box>
    )
}

export default RegistrationForm
