import { useState } from "react";
import AppCard from "../../components/AppCard";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import EmployeeLogFilter from "../../features/employeeLog/EmployeeLogFilter";

function EmployeeLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير الموظفين" },
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
        <EmployeeLogFilter onFilter={setFilterValues} />
        </AppCard>
    </>
   );
}

export default EmployeeLogsPage;