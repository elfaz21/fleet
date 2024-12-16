const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carTitle: { type: String, required: true },
  carDescription: { type: String, required: true },
  carModel: { type: String, required: true }, // Model of the car
  carImage: { type: String, required: true }, // URL or data URL
  fuelConsumption: { type: Number, required: true }, // Fuel consumption in liters per 100 km
  mileage: { type: Number, required: true }, // Total mileage in kilometers
  year: { type: Number, required: true }, // Year of manufacture
  vin: { type: String, unique: true, required: true }, // Vehicle Identification Number
  licensePlate: { type: String, required: true }, // License plate number
  maintenanceHistory: [{ // Array to hold maintenance records
    date: { type: Date, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
  }],
  lastServiceDate: { type: Date }, // Date of the last service
  nextServiceDue: { type: Date }, // When the next service is due
  status: { type: String, enum: ['available', 'in use', 'in maintenance'], required: true }, // Current status of the car
});

module.exports = mongoose.model('Car', carSchema);