import { Route } from "react-router-dom";
import ProductsPage from "../pages/product/ProductsPage";
import AddProduct from "../pages/product/AddProduct";

function ProductRoutes() {
  return (
    <>
      <Route path="/product" element={<ProductsPage />} />
      <Route path="/product/new" element={<AddProduct />} />
       {/* <Route path="/product/details/:id" element={<StoreDetails />} /> */}
      {/* <Route path="/product/edit/:id" element={<StoreEdit />} /> */}
    </>
   );
}

export default ProductRoutes;