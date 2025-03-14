import { Route } from "react-router-dom";
import SuppliersPage from "../pages/supplier/SuppliersPage";

function SupplierRoutes() {
  return (
    <>
          <Route path="/supplier" element={<SuppliersPage />} />
      {/* <Route path="/product/new" element={<AddProduct />} /> */}
      {/* <Route path="/product/details/:id" element={<ProductDetails />} /> */}
      {/* <Route path="/product/edit/:id" element={<ProductEdit />} /> */}
    </>
   );
}

export default SupplierRoutes;