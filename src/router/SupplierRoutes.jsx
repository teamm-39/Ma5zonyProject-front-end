import { Route } from "react-router-dom";
import SuppliersPage from "../pages/supplier/SuppliersPage";
import AddSupplier from "../pages/supplier/AddSupplier";
import SupplierDetails from "../pages/supplier/SupplierDetails";
import SupplierEdit from "../pages/supplier/SupplierEdit";

function SupplierRoutes() {
  return (
    <>
      <Route path="/supplier" element={<SuppliersPage />} />
      <Route path="/supplier/new" element={<AddSupplier />} />
      <Route path="/supplier/details/:id" element={<SupplierDetails />} />
      <Route path="/supplier/edit/:id" element={<SupplierEdit />} />
    </>
  );
}

export default SupplierRoutes;
