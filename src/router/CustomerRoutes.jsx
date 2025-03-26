import { Route } from "react-router-dom";
import AddCustomer from "../pages/customer/AddCustomer";
import CustomersPage from "../pages/customer/CustomersPage";
import CustomerDetails from "../pages/customer/CustomerDetails";
import CustomerEdit from "../pages/customer/CustomerEdit";
function CustomerRoutes() {
  return (
    <>
      <Route path="/customer" element={<CustomersPage />} />
      <Route path="/customer/new" element={<AddCustomer />} />
      <Route path="/customer/details/:id" element={<CustomerDetails />} />
      <Route path="/customer/edit/:id" element={<CustomerEdit />} />
    </>
  );
}

export default CustomerRoutes;
