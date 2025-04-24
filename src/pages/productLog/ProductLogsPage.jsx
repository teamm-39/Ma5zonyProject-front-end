import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ProductLogFilter from "../../features/ProductLog/ProductLogFilter";
import ProductLogsTable from "../../features/ProductLog/ProductLogsTable";

function ProductLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير المنتجات" },
  ];
    const [filterValues, setFilterValues] = useState({
      userName: "",
      operationType: "",
      dateTime: "",
      newProductName: "",
      oldProductName: "",
      oldSellingPrice: "",
      newSellingPrice: "",
      oldPurchasePrice: "",
      newPurchasePrice: "",
    });
  return (
    <AppCard>
      <AppBreadCrumb items={items} />
      <ProductLogFilter onFilter={setFilterValues} />
      <ProductLogsTable filterValues={filterValues}/>
    </AppCard>
  );
}

export default ProductLogsPage;
