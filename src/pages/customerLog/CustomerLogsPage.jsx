import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import CustomerLogFilter from "../../features/customerLog/CustomerLogFilter";

function CustomerLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير العملاء" },
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
        <CustomerLogFilter onFilter={setFilterValues} />
      </AppCard>
    </>
  );
}

export default CustomerLogsPage;
