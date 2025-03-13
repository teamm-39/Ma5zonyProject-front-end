import { Route } from "react-router-dom";
import ProductsPage from "../pages/product/ProductsPage";

function ProductRoutes() {
  return (
    <>
      <Route path="/product" element={<ProductsPage />} />
      {/* <Route path="/product/new" element={<AddStore />} />
      <Route path="/product/details/:id" element={<StoreDetails />} />
      <Route path="/product/edit/:id" element={<StoreEdit />} /> */}
    </>
   );
}

export default ProductRoutes;