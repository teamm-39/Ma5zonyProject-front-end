import { Route } from "react-router-dom";
import SuppliersPage from "../pages/supplier/SuppliersPage";
import AddSupplier from "../pages/supplier/AddSupplier";

function SupplierRoutes() {
  return (
    <>
          <Route path="/supplier" element={<SuppliersPage />} />
      <Route path="/supplier/new" element={<AddSupplier />} />
      {/* <Route path="/supplier/details/:id" element={<ProductDetails />} /> */}
      {/* <Route path="/supplier/edit/:id" element={<ProductEdit />} /> */}
    </>
   );
}

export default SupplierRoutes;