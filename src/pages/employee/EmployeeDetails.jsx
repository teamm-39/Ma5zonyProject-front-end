import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";

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
        {/* <EmployeeAddForm /> */}
    </AppCard>
    </>
   );
}

export default EmployeeDetails;