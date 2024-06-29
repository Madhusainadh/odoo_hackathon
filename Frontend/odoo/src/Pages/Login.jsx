import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, gql } from "@apollo/client";

// Define the GraphQL login mutation
const LOGIN_MUTATION = gql`
  mutation Login($mobileNumber: String!, $password: String!) {
    login(mobileNumber: $mobileNumber, password: $password) {
      id
      mobileNumber
      email
      Role
    }
  }
`;

const Login = () => {
  const [data, setData] = useState({
    mobileNumber: "",
    password: "",
  });

  // Setup the mutation hook
  const [login, { data: loginData, loading, error }] =
    useMutation(LOGIN_MUTATION);
  const toast = useToast();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          mobileNumber: data.mobileNumber,
          password: data.password,
        },
      });
      console.log("Login successful:", response.data.login);
      toast({
        title: "Login successful",
        description: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Handle successful login, e.g., redirect, store token, etc.
    } catch (err) {
      console.error("Error logging in:", err);
      // Handle errors, e.g., show error message
      toast({
        title: "Error  logging in",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={6}
        maxW="400px"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="sm"
      >
        <FormControl id="mobileNumber" isRequired>
          <FormLabel>Enter your number:</FormLabel>
          <Input
            name="mobileNumber"
            type="number"
            value={data.mobileNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Enter your password:</FormLabel>
          <Input
            name="password"
            type="password" // Change type to 'password' for better security
            value={data.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          type="submit"
          isLoading={loading} // Show loading indicator while the mutation is processing
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
