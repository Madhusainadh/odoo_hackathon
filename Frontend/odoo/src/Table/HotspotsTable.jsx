import React, { useState, useEffect, useContext } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, useToast } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query for fetching hotspots
const GET_HOTSPOTS_QUERY = gql`
  query GetPostedHotspotForAdmin($limit: Int, $page: Int) {
    getPostedHotspotForAdmin(limit: $limit, page: $page) {
      id
      _id
      address
      latitude
      longitude
      description
      createdAt
      updatedAt
      Created_By
      assigned_collector
    }
  }
`;

// Simulated User Context (replace this with your actual user context or authorization logic)
const UserContext = React.createContext({ isAuthorized: true }); // Assume authorized by default for demonstration

const HotspotsTable = () => {
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { isAuthorized } = useContext(UserContext);
  const toast = useToast();

  const { data, loading, error } = useQuery(GET_HOTSPOTS_QUERY, {
    variables: { limit, page: currentPage }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching hotspots",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleSave = async (id, newData) => {
    // Assuming here you will call another mutation or API to update the data
    setEditId(null);
    toast({
      title: "Update successful",
      description: "Hotspot data updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    setEditId(null);
  };

  if (loading) return <Box>Loading...</Box>;

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Latitude</Th>
            <Th>Longitude</Th>
            <Th>Description</Th>
            {isAuthorized && <Th>Collector's Mobile</Th>}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data&&data?.getPostedHotspotForAdmin?.map(hotspot => (
            <Tr key={hotspot._id}>
              <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.address} /> : hotspot.address}</Td>
              <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.latitude} /> : hotspot.latitude}</Td>
              <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.longitude} /> : hotspot.longitude}</Td>
              <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.description} /> : hotspot.description}</Td>
              {isAuthorized && (
                <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.assigned_collector} /> : hotspot.assigned_collector}</Td>
              )}
              <Td>
                {editId === hotspot._id ? (
                  <Box>
                    <Button onClick={() => handleSave(hotspot._id, { /* Collect data here */ })} size="sm" mr={2}><CheckIcon /></Button>
                    <Button onClick={handleCancel} size="sm"><CloseIcon /></Button>
                  </Box>
                ) : (
                  <Button onClick={() => handleEdit(hotspot._id)} size="sm"><EditIcon /></Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</Button>
      <Button onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
    </Box>
  );
};

export default HotspotsTable;
