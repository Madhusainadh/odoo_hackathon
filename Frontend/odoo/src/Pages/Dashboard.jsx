import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh">
      <Link to="/signup">
        <Button colorScheme="blue">Signup</Button>
      </Link>
      <Link to="/login">
        <Button colorScheme="teal" mt={4}>Login</Button>
      </Link>
    </Flex>
  );
};

export default Dashboard;