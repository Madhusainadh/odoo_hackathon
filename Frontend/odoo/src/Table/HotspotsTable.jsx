import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Input, useToast } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

// Simulated User Context (replace this with your actual user context or authorization logic)
const UserContext = React.createContext({ isAuthorized: true }); // Assume authorized by default for demonstration

const HotspotsTable = () => {
  const [hotspots, setHotspots] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isAuthorized } = useContext(UserContext); // Get authorization status
  const toast = useToast();

  useEffect(() => {
    fetchHotspots(currentPage, limit);
  }, [currentPage, limit]);

  const fetchHotspots = async (page, limit) => {
    try {
      const response = await axios.get(`http://yourapi/hotspots?page=${page}&limit=${limit}`);
      setHotspots(response.data.items);
      setTotalCount(response.data.pageInfo.totalCount);
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleSave = async (id, newData) => {
    try {
      await axios.put(`http://yourapi/hotspots/${id}`, newData);
      setEditId(null);
      fetchHotspots(currentPage, limit);
      toast({
        title: "Update successful",
        description: "Hotspot data updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating data",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Latitude</Th>
            <Th>Longitude</Th>
            <Th>Description</Th>
            {isAuthorized && <Th>Collector's Mobile</Th>} {/* Conditionally render based on authorization */}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hotspots.map(hotspot => (
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
      <Button disabled={currentPage * limit >= totalCount} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
    </Box>
  );
};

export default HotspotsTable;


// import React, { useState } from 'react';
// import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input } from '@chakra-ui/react';
// import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

// const dummyHotspots = [
//   { _id: '1', address: '1234 Maple St.', latitude: 40.7128, longitude: -74.0060, description: 'Litter around the park.' },
//   { _id: '2', address: '5678 Oak St.', latitude: 34.0522, longitude: -118.2437, description: 'Overflowing trash bins.' },
//   { _id: '3', address: '910 Pine St.', latitude: 37.7749, longitude: -122.4194, description: 'Illegal dump site.' },
//   { _id: '4', address: '234 Elm St.', latitude: 25.7617, longitude: -80.1918, description: 'Street corner littered.' },
//   { _id: '5', address: '789 Ash St.', latitude: 41.8781, longitude: -87.6298, description: 'Abandoned waste materials.' }
// ];

// const HotspotsTable = () => {
//   const [hotspots, setHotspots] = useState(dummyHotspots);
//   const [editId, setEditId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;
//   const totalPages = Math.ceil(hotspots.length / itemsPerPage);

//   const visibleItems = hotspots.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleEdit = (id) => {
//     setEditId(id);
//   };

//   const handleSave = (id) => {
//     setEditId(null);
//   };

//   const handleCancel = () => {
//     setEditId(null);
//   };

//   return (
//     <Box overflowX="auto">
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th>Address</Th>
//             <Th>Latitude</Th>
//             <Th>Longitude</Th>
//             <Th>Description</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {visibleItems.map(hotspot => (
//             <Tr key={hotspot._id}>
//               <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.address} /> : hotspot.address}</Td>
//               <Td>{editId === hotspot._id ? <Input type="number" defaultValue={hotspot.latitude} /> : hotspot.latitude}</Td>
//               <Td>{editId === hotspot._id ? <Input type="number" defaultValue={hotspot.longitude} /> : hotspot.longitude}</Td>
//               <Td>{editId === hotspot._id ? <Input defaultValue={hotspot.description} /> : hotspot.description}</Td>
//               <Td>
//                 {editId === hotspot._id ? (
//                   <Box>
//                     <Button onClick={() => handleSave(hotspot._id)} size="sm" mr={2}><CheckIcon /></Button>
//                     <Button onClick={handleCancel} size="sm"><CloseIcon /></Button>
//                   </Box>
//                 ) : (
//                   <Button onClick={() => handleEdit(hotspot._id)} size="sm"><EditIcon /></Button>
//                 )}
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//       <Button disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</Button>
//       <Button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
//     </Box>
//   );
// };

// export default HotspotsTable;
