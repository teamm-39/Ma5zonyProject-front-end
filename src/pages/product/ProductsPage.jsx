import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ProductFilter from "../../features/product/ProductFilter";
import ProductsTable from "../../features/product/ProductsTable";

function ProductsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المنتجات" },
  ];
  const [filterValues, setFilterValues] = useState({
    name: "",
    sellingPrice: "",
    purchasePrice: "",
  });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ProductFilter onFilter={setFilterValues} />
        <ProductsTable filterValues={filterValues} />
      </AppCard>
    </>
   );
}

export default ProductsPage;