import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import EmployeeDetailsForm from "../../features/employee/EmployeeDetailsForm";

function EmployeeDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموظفين", url: "/employee" },
    {label:"تفاصيل موظف"}
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <EmployeeDetailsForm/>
    </AppCard>
    </>
   );
}

export default EmployeeDetails;