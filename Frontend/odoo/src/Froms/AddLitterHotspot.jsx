import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

const CREATE_HOTSPOT_MUTATION = gql`
  mutation CreateHotspot(
    $address: String!
    $latitude: BigInt!
    $longitude: BigInt!
    $description: String!
  ) {
    createHotspot(
      address: $address
      latitude: $latitude
      longitude: $longitude
      description: $description
    ) {
      _id
      address
      latitude
      longitude
      description
    }
  }
`;

const AddLitterHotspot = () => {
  const [hotspot, setHotspot] = useState({
    address: "",
    latitude: "",
    longitude: "",
    description: "",
    pincode: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
  });
  const toast = useToast();
  const [createHotspot, { data, loading, error }] = useMutation(
    CREATE_HOTSPOT_MUTATION
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setHotspot((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.error("Error obtaining location", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotspot({
      ...hotspot,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHotspot({
        variables: {
          address: hotspot.address,
          latitude: parseFloat(hotspot.latitude),
          longitude: parseFloat(hotspot.longitude),
          description: hotspot.description,
        },
      });
      toast({
        title: "Hotspot Created",
        description: "New litter hotspot has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error Creating Hotspot",
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
        <FormControl mb={4} isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={hotspot.address}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Latitude</FormLabel>
          <NumberInput precision={6} allowMouseWheel>
            <Input
              name="latitude"
              value={hotspot.latitude.toString()}
              onChange={handleChange}
            />
          </NumberInput>
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Longitude</FormLabel>
          <NumberInput precision={6} allowMouseWheel>
            <Input
              name="longitude"
              value={hotspot.longitude.toString()}
              onChange={handleChange}
            />
          </NumberInput>
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={hotspot.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Pincode</FormLabel>
          <Input
            name="pincode"
            type="number"
            value={hotspot.pincode}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image One URL</FormLabel>
          <Input
            name="imageOne"
            value={hotspot.imageOne}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image Two URL</FormLabel>
          <Input
            name="imageTwo"
            value={hotspot.imageTwo}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image Three URL</FormLabel>
          <Input
            name="imageThree"
            value={hotspot.imageThree}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Submit Hotspot
        </Button>
      </Box>
    </Box>
  );
};

export default AddLitterHotspot;
