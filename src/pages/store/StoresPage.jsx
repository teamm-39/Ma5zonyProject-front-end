import "../../assets/css/StoresPage.css";
import AppCard from "../../components/AppCard";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import StoreFilter from "../../features/store/StoreFilter";
import StoresTable from "../../features/store/StoresTable";
import { useState } from "react";
function StoresPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المخازن" },
  ];
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    city: "",
  });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <StoreFilter onFilter={setFilters} />
        <StoresTable filterValues={ filters } />
      </AppCard>
    </>
  );
}

export default StoresPage;
