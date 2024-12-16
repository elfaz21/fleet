import axios from "axios";
import React, { useEffect, useState } from "react";

const CarDashboardCards = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [availableCars, setAvailableCars] = useState(0);
  const [underMaintenance, setUnderMaintenance] = useState(0);
  const [inUseCars, setInUseCars] = useState(0);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get("http://192.168.8.100:5000/api/cars");

        setTotalCars(response.data.length);

        const available = response.data.filter(
          (car) => car.status === "available"
        );
        const maintenance = response.data.filter(
          (car) => car.status === "in maintenance"
        );
        const inUse = response.data.filter((car) => car.status === "in use");

        setAvailableCars(available.length);
        setUnderMaintenance(maintenance.length);
        setInUseCars(inUse.length);
      } catch (error) {
        console.error("Error fetching car data: ", error);
      }
    };

    fetchCarData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 md:mx-20">
      <div className="bg-blue-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Total Cars</h2>
        <p className="text-4xl font-bold">{totalCars}</p>
      </div>
      <div className="bg-green-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Available Cars</h2>
        <p className="text-4xl font-bold">{availableCars}</p>
      </div>
      <div className="bg-yellow-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Under Maintenance</h2>
        <p className="text-4xl font-bold">{underMaintenance}</p>
      </div>
      <div className="bg-red-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">In Use</h2>
        <p className="text-4xl font-bold">{inUseCars}</p>
      </div>
    </div>
  );
};

export default CarDashboardCards;
