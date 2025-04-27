import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import OwnerLogsFilter from "../../features/ownerLog/OwnerLogFilter";
import OwnerLogsTable from "../../features/ownerLog/OwnerLogsTable";

function OwnerLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير الملاك" },
  ];
      const [filterValues, setFilterValues] = useState({
        userName: "",
        operationType: "",
        fromDateTime: "",
        toDateTime: "",
        oldUserName: "",
        newUserName: "",
        oldName: "",
        newName: "",
        oldAge: "",
        newAge: "",
        oldPhoneNumber: "",
        newPhoneNumber: "",
        oldAddress: "",
        newAddress: "",
      });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <OwnerLogsFilter onFilter={setFilterValues} />
        <OwnerLogsTable filterValues={filterValues} />
      </AppCard>
    </>
  );
}

export default OwnerLogsPage;
