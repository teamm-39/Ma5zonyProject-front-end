import { Route } from "react-router-dom";
import AddSupplier from "../pages/supplier/AddSupplier";
import StoreEdit from "../pages/supplier/StoreEdit";
import SupplierDetails from "../pages/supplier/SupplierDetails";
import CustomersPage from "../pages/customer/CustomersPage";

function CustomerRoutes() {
  return (
    <>
      <Route path="/customer" element={<CustomersPage />} />
      <Route path="/customer/new" element={<AddSupplier />} />
      <Route path="/customer/details/:id" element={<SupplierDetails />} />
      <Route path="/customer/edit/:id" element={<StoreEdit />} />
    </>
  );
}

export default CustomerRoutes;
