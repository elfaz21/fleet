// deno-lint-ignore-file
import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";

function NewCar() {
  const [, setCarImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [status] = useState("available"); // Default status
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [nextServiceDue, setNextServiceDue] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {};

    formData.forEach((value, key) => {
      if (key === "carImage") {
        const file = e.target[key].files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            payload[key] = reader.result; // Store the image data URL
            sendData(payload);
          };
          reader.readAsDataURL(file);
        }
      } else {
        payload[key] = value; // Gather other form data
      }
    });

    payload.status = status; // Include the status in the payload
    payload.lastServiceDate = lastServiceDate
      ? new Date(lastServiceDate)
      : null;
    payload.nextServiceDue = nextServiceDue ? new Date(nextServiceDue) : null;

    setTimeout(() => {
      e.target.reset();
      setSuccessMessage(null);
    }, 3000);
  };

  const sendData = async (payload) => {
    try {
      const response = await axios.post(
        "http://192.168.8.100:5000/api/cars",
        payload
      );

      if (response.status === 200) {
        setSuccessMessage("Car added successfully!");
      } else {
        console.error("Failed to add car.");
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-8 mx-auto w-full max-w-lg flex flex-col items-center px-4">
        <h1 className="text-center font-bold text-3xl text-BlueBlackColor mb-2">
          Add New Car
        </h1>
        {successMessage && (
          <p className="text-green-500 font-bold mb-4">{successMessage}</p>
        )}
        <form
          onSubmit={handleAddCar}
          className="w-full bg-white shadow-md rounded-lg p-6"
        >
          <label htmlFor="carImage" className="font-bold text-sm mb-2">
            Car Image:
          </label>
          <input
            type="file"
            name="carImage"
            className="input-field mb-4 p-2 border rounded-md w-full"
            onChange={handleFileUpload}
            required
          />

          <div className="input-group mb-4">
            <label htmlFor="carTitle" className="font-bold text-sm mb-2">
              Car Title:
            </label>
            <input
              type="text"
              id="carTitle"
              name="carTitle"
              className="border rounded-md w-full p-2 text-sm"
              required
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="carModel" className="font-bold text-sm mb-2">
              Car Model:
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              className="border rounded-md w-full p-2 text-sm"
              required
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="carDescription" className="font-bold text-sm mb-2">
              Car Description:
            </label>
            <textarea
              id="carDescription"
              name="carDescription"
              className="border rounded-md w-full p-2 text-sm"
              style={{ height: "120px", wordWrap: "break-word" }}
              required
            ></textarea>
          </div>
          <div className="input-group mb-4">
            <label htmlFor="fuelConsumption" className="font-bold text-sm mb-2">
              Fuel Consumption (L/100km):
            </label>
            <input
              type="number"
              id="fuelConsumption"
              name="fuelConsumption"
              className="border rounded-md w-full p-2 text-sm"
              required
              step="0.1"
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="mileage" className="font-bold text-sm mb-2">
              Mileage (km):
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              className="border rounded-md w-full p-2 text-sm"
              required
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="year" className="font-bold text-sm mb-2">
              Year of Manufacture:
            </label>
            <input
              type="number"
              id="year"
              name="year"
              className="border rounded-md w-full p-2 text-sm"
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="vin" className="font-bold text-sm mb-2">
              VIN (Vehicle Identification Number):
            </label>
            <input
              type="text"
              id="vin"
              name="vin"
              className="border rounded-md w-full p-2 text-sm"
              required
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="licensePlate" className="font-bold text-sm mb-2">
              License Plate:
            </label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              className="border rounded-md w-full p-2 text-sm"
              required
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="lastServiceDate" className="font-bold text-sm mb-2">
              Last Service Date:
            </label>
            <input
              type="date"
              id="lastServiceDate"
              name="lastServiceDate"
              className="border rounded-md w-full p-2 text-sm"
              onChange={(e) => setLastServiceDate(e.target.value)}
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="nextServiceDue" className="font-bold text-sm mb-2">
              Next Service Due:
            </label>
            <input
              type="date"
              id="nextServiceDue"
              name="nextServiceDue"
              className="border rounded-md w-full p-2 text-sm"
              onChange={(e) => setNextServiceDue(e.target.value)}
            />
          </div>

          <div className="input-group">
            <button className="bg-coffeeColor text-sm font-bold text-white px-5 py-2 w-full rounded-lg hover:bg-black transition duration-200">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewCar;
