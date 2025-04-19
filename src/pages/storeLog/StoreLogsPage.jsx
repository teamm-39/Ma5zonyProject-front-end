import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import StoreLogFilter from "../../features/storeLog/StoreLogFilter";
function StoreLogsPage() {
  const items= [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير المخازن" },
  ];
    const [filterValues, setFilterValues] = useState({
      userName: "",
      operationType: null,
      dateTime: null,
      storeName: "",
    });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <StoreLogFilter onFilter={setFilterValues} />
    </AppCard>
    </>
   );
}

export default StoreLogsPage;