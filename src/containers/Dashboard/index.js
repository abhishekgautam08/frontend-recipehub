import NavbarComponent from "@/components/Navbar/Navbar";
import React from "react";
import Cards from "./Components/cards";

const Dashboard = ({name}) => {
  return (
    <>
      <NavbarComponent name={name} />
      
      <Cards />
    </>
  );
};

export default Dashboard;
