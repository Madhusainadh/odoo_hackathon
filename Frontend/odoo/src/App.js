import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from '@apollo/client';
import Client from './ConnectServer/ConnectServer'; // Import Apollo Client instance
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import AddLitterHotspot from "./Froms/AddLitterHotspot"; // Check spelling in path if necessary
import HotspotsTable from "./Table/HotspotsTable";
import NavBar from "./Navbar/navbar";

function App() {
  return (
    <ApolloProvider client={Client}>
      <ChakraProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/AddLitterHotspot" element={<AddLitterHotspot />} />
            <Route path="/HotspotsTable" element={<HotspotsTable />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
