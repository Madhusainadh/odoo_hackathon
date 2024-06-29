import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, Select ,useToast} from "@chakra-ui/react";
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      FullName
      Role
      mobileNumber
      email
    }
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    Role: "residents", // Default role
    mobileNumber: "",
    email: "",
    password: "",
  });
  const toast = useToast();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: {
          input: {
            ...formData,
            Unique_Id: "Generate_or_fetch_your_unique_ID", // Adjust accordingly
            accType: "Some_account_type", // Define or select the account type
            Is_Active: true, // Set active status
          }
        }
      });
      console.log("User created:", data);
      // Redirect or show success message
      toast({
        title: "user Created",
        description: "New user has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error creating user:", err);
      // Handle errors, e.g., show error message
      toast({
        title: "Error Creating User",
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
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={4}
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
        <FormControl isRequired={false} mb={4}>
          <FormLabel htmlFor="FullName">Full Name</FormLabel>
          <Input
            id="FullName"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="Role">Role</FormLabel>
          <Select
            id="Role"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
          >
            <option value="residents">Residents</option>
            {/* <option value="admin">Admin</option>
            <option value="guest">Guest</option> */}
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
          <Input
            id="mobileNumber"
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired={false} mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired={false} mb={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
