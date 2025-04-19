import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import StoreLogFilter from "../../features/storeLog/StoreLogFilter";
import StoreLogsTable from "../../features/storeLog/StoreLogsTable";
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
        <StoreLogsTable filterValues={filterValues} />
    </AppCard>
    </>
   );
}

export default StoreLogsPage;