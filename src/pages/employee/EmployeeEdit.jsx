import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";

function EmployeeEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموظفين", url: "/employee" },
    {label:"تعديل موظف"}
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

export default EmployeeEdit;