import { useState } from "react";
import AppCard from "../../components/AppCard";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import SupplierLogFilter from "../../features/supplierLog/SupplierLogFilter";
import SupplierLogsTable from "../../features/supplierLog/SupplierLogsTable";

function SupplierLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير الموردين" },
  ];
      const [filterValues, setFilterValues] = useState({
        userName: "",
        operationType: "",
        fromDateTime: "",
        toDateTime: "",
        oldName: "",
        newName: "",
        oldEmail: "",
        newEmail: "",
        oldPhoneNumber: "",
        newPhoneNumber: "",
      });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <SupplierLogFilter onFilter={setFilterValues} />
        <SupplierLogsTable filterValues={filterValues} />
      </AppCard>
    </>
   );
}

export default SupplierLogsPage;