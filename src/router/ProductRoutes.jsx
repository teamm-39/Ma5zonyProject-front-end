import { Route } from "react-router-dom";
import ProductsPage from "../pages/product/ProductsPage";
import AddProduct from "../pages/product/AddProduct";
import ProductDetails from "../pages/product/ProductDetails";
import ProductEdit from "../pages/product/ProductEdit";

function ProductRoutes() {
  return (
    <>
      <Route path="/product" element={<ProductsPage />} />
      <Route path="/product/new" element={<AddProduct />} />
       <Route path="/product/details/:id" element={<ProductDetails />} />
      <Route path="/product/edit/:id" element={<ProductEdit />} />
    </>
   );
}

export default ProductRoutes;