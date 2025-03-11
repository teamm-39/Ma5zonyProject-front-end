import { Route } from "react-router-dom";
import EmployeesPage from "../pages/employee/EmployeesPage";
import AddEmployee from "../pages/employee/AddEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import EmployeeEdit  from "../pages/employee/EmployeeEdit";
function EmployeeRoutes() {
  return (
    <>
      <Route path="/employee" element={<EmployeesPage />} />
      <Route path="/employee/new" element={<AddEmployee />} />
      <Route path="/employee/details/:id" element={<EmployeeDetails />} />
      <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
    </>
  );
}

export default EmployeeRoutes;
