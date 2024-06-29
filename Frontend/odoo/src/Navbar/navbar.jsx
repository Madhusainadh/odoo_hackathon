import React from 'react';
import { Flex, Box, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Flex bg="gray.800" color="white" px={5} py={3} justifyContent="space-between" alignItems="center">
      <Box p="2">My App</Box>
      <Box>
        <Link as={RouterLink} to="/" p={2}>Dashboard</Link>
        <Link as={RouterLink} to="/HotspotsTable" p={2}>Hotspots</Link>
        <Link as={RouterLink} to="/AddLitterHotspot" p={2}>Add Litter Hotspot</Link>
        <Link as={RouterLink} to="/signup" p={2}>Signup</Link>
        <Link as={RouterLink} to="/login" p={2}>Login</Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
