import React, { useEffect } from "react";
import MainLayout from "../../../components/MainLayout/MainLayout";

const Reservation: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <MainLayout title="Reservation">
      <h1>Hello, world!</h1>
      <button onClick={handleClick}>Click me</button>
    </MainLayout>
  );
};

export default Reservation;
