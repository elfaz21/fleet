import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";

function Cars() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [editedData, setEditedData] = useState({
    carTitle: "",
    carDescription: "",
    carModel: "",
    carImage: "",
    fuelConsumption: "",
    mileage: "",
    year: "",
    vin: "",
    licensePlate: "",
    status: "available",
    lastServiceDate: "",
    nextServiceDue: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const carImage = reader.result;
        setEditedData({ ...editedData, carImage });
      };
      reader.readAsDataURL(file);
    }
  };

  const getCars = async () => {
    try {
      const response = await axios.get("http://192.168.8.100:5000/api/cars");
      setCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving cars:", error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Formats date to YYYY-MM-DD
  };

  const handleEdit = (car) => {
    setEditCar(car);
    setEditedData({
      carTitle: car.carTitle,
      carDescription: car.carDescription,
      carModel: car.carModel,
      carImage: car.carImage,
      fuelConsumption: car.fuelConsumption,
      mileage: car.mileage,
      year: car.year,
      vin: car.vin,
      licensePlate: car.licensePlate,
      status: car.status || "available",
      lastServiceDate: car.lastServiceDate || "",
      nextServiceDue: car.nextServiceDue || "",
    });
    setEditModalVisible(true);
  };

  const handleDelete = (car) => {
    setDeleteCar(car);
    setDeleteModalVisible(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://192.168.8.100:5000/api/cars/${editCar._id}`,
        editedData
      );
      console.log("Car updated successfully:", response.data);
      setEditModalVisible(false);
      getCars();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.8.100:5000/api/cars/${deleteCar._id}`
      );
      console.log("Car deleted successfully:", response.data);
      setDeleteModalVisible(false);
      getCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const closeEditModal = () => setEditModalVisible(false);
  const closeDeleteModal = () => setDeleteModalVisible(false);

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.slice(0, 100) + "...";
    }
    return description;
  };

  return (
    <div className="md:ml-64">
      <Navbar />
      <div className="container mx-auto mt-10">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-20 px-3 mx-10 py-2 border border-gray-300 rounded-md"
        />
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">Cars</h1>
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900 mt-20"></div>
          </div>
        ) : (
          <div className="mx-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-coffeeColor text-white">
                  <tr>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Car Image
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Title
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Description
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Model
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Fuel Consumption
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Mileage
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Year
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      VIN
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      License Plate
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Status
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Last Service Date
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Next Service Due
                    </th>
                    <th className="text-center py-3 px-2 uppercase font-semibold text-sm w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars
                    .filter((car) =>
                      car.carTitle
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((car) => (
                      <tr key={car._id}>
                        <td className="py-4 px-2">
                          <img
                            src={car.carImage}
                            className="w-24 h-14 object-cover rounded-lg"
                            alt="Car"
                          />
                        </td>
                        <td className="py-4 px-2 font-bold">{car.carTitle}</td>
                        <td className="py-4 px-2">
                          {truncateDescription(car.carDescription)}
                        </td>
                        <td className="py-4 px-2">{car.carModel}</td>
                        <td className="py-4 px-2">
                          {car.fuelConsumption} L/100km
                        </td>
                        <td className="py-4 px-2">{car.mileage} km</td>
                        <td className="py-4 px-2">{car.year}</td>
                        <td className="py-4 px-2">{car.vin}</td>
                        <td className="py-4 px-2">{car.licensePlate}</td>
                        <td className="py-4 px-2">{car.status}</td>
                        <td className="py-4 px-2">
                          {formatDate(car.lastServiceDate)}
                        </td>
                        <td className="py-4 px-2">
                          {formatDate(car.nextServiceDue)}
                        </td>
                        <td className="py-4 px-2 flex">
                          <img
                            src="./edit.png"
                            alt="Edit"
                            className="cursor-pointer w-5 h-5 mr-2"
                            onClick={() => handleEdit(car)}
                          />
                          <img
                            src="./delete.png"
                            alt="Delete"
                            className="cursor-pointer w-5 h-5"
                            onClick={() => handleDelete(car)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editCar && editModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <div className="flex justify-between px-5 py-5">
              <h2 className="font-bold text-lg">Edit Car</h2>
              <img
                src="./close.png"
                alt=""
                onClick={closeEditModal}
                className="cursor-pointer w-5 h-5"
              />
            </div>
            <hr />
            <div className="px-10 py-10 overflow-y-scroll max-h-96">
              <form onSubmit={handleEditSubmit}>
                <div className="input-group flex flex-col mb-3">
                  <label htmlFor="carImage" className="font-bold text-sm">
                    Car Image:
                  </label>
                  <input
                    type="file"
                    name="carImage"
                    className="input-field mt-1 p-2 block w-full rounded-md"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="title" className="font-bold text-sm mb-1">
                    Car Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedData.carTitle}
                    onChange={(e) =>
                      setEditedData({ ...editedData, carTitle: e.target.value })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label
                    htmlFor="description"
                    className="font-bold text-sm mb-1"
                  >
                    Car Description:
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
                    value={editedData.carDescription}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        carDescription: e.target.value,
                      })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  ></textarea>
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label htmlFor="model" className="font-bold text-sm mb-1">
                    Car Model:
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={editedData.carModel}
                    onChange={(e) =>
                      setEditedData({ ...editedData, carModel: e.target.value })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label
                    htmlFor="fuelConsumption"
                    className="font-bold text-sm mb-1"
                  >
                    Fuel Consumption (L/100km):
                  </label>
                  <input
                    type="number"
                    id="fuelConsumption"
                    name="fuelConsumption"
                    value={editedData.fuelConsumption}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        fuelConsumption: e.target.value,
                      })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label htmlFor="mileage" className="font-bold text-sm mb-1">
                    Mileage (km):
                  </label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={editedData.mileage}
                    onChange={(e) =>
                      setEditedData({ ...editedData, mileage: e.target.value })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label htmlFor="year" className="font-bold text-sm mb-1">
                    Year:
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={editedData.year}
                    onChange={(e) =>
                      setEditedData({ ...editedData, year: e.target.value })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label htmlFor="vin" className="font-bold text-sm mb-1">
                    VIN:
                  </label>
                  <input
                    type="text"
                    id="vin"
                    name="vin"
                    value={editedData.vin}
                    onChange={(e) =>
                      setEditedData({ ...editedData, vin: e.target.value })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label
                    htmlFor="licensePlate"
                    className="font-bold text-sm mb-1"
                  >
                    License Plate:
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={editedData.licensePlate}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        licensePlate: e.target.value,
                      })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label
                    htmlFor="lastServiceDate"
                    className="font-bold text-sm mb-1"
                  >
                    Last Service Date:
                  </label>
                  <input
                    type="date"
                    id="lastServiceDate"
                    name="lastServiceDate"
                    value={editedData.lastServiceDate}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        lastServiceDate: e.target.value,
                      })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label
                    htmlFor="nextServiceDue"
                    className="font-bold text-sm mb-1"
                  >
                    Next Service Due:
                  </label>
                  <input
                    type="date"
                    id="nextServiceDue"
                    name="nextServiceDue"
                    value={editedData.nextServiceDue}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        nextServiceDue: e.target.value,
                      })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  />
                </div>
                <div className="input-group flex flex-col mb-3">
                  <label htmlFor="status" className="font-bold text-sm mb-1">
                    Status:
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={editedData.status}
                    onChange={(e) =>
                      setEditedData({ ...editedData, status: e.target.value })
                    }
                    className="border rounded-md w-full px-3 py-1 text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="in use">In Use</option>
                    <option value="in maintenance">In Maintenance</option>
                  </select>
                </div>
                <div className="input-group flex flex-col mb-3">
                  <button
                    type="submit"
                    className="bg-coffeeColor text-sm font-bold text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteCar && deleteModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded w-96">
            <div className="flex justify-between px-5 py-5">
              <h2 className="font-bold text-lg">Delete Car</h2>
              <img
                src="./close.png"
                alt=""
                onClick={closeDeleteModal}
                className="cursor-pointer w-5 h-5"
              />
            </div>
            <hr />
            <div className="px-10 py-10">
              <h2>Are you sure you want to delete this Car?</h2>
              <div className="flex justify-between mt-9">
                <button
                  className="bg-coffeeColor text-sm font-bold text-white px-5 py-2 rounded-lg hover:bg-red-700"
                  onClick={handleDeleteSubmit}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-sm font-bold text-black px-5 py-2 rounded-lg hover:bg-gray-400"
                  onClick={closeDeleteModal}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
