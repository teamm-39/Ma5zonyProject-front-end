import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import EmployeeFilter from "../../features/employee/EmployeeFilter";
import EmployeesTable from "../../features/employee/EmployeesTable";

function EmployeesPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموظفين" },
  ];
    const [filterValues, setFilterValues] = useState({
      name: "",
      userName: "",
      age: "",
      phone: "",
      address: "",
    });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <EmployeeFilter onFilter={setFilterValues} />
        <EmployeesTable filterValues={filterValues} />
      </AppCard>
    </>
   );
}

export default EmployeesPage;