import Navbar from "../components/navbar.jsx";
import CarDashboardCards from "./car_dashboard.jsx";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="mt-28 ml-64 w-3/4 mx-auto xls:w-[90%] xls:mx-2 xs:mx-2 xs:w-[90%]">
        <h1 className="text-center text-4xl font-extrabold text-blue-900 mb-10">
          Dashboard
        </h1>
        <CarDashboardCards />
      </div>
    </>
  );
}

export default Dashboard;
