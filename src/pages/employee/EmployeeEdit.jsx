import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import EmployeeEditForm from "../../features/employee/EmployeeEditForm";

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
        <EmployeeEditForm/>

    </AppCard>
    </>
   );
}

export default EmployeeEdit;