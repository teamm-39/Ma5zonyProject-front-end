import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import EmployeeAddForm from "../../features/employee/EmployeeAddForm";

function AddEmployee() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموظفين", url: "/employee" },
    {label:"اضافة موظف"}
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <EmployeeAddForm />
    </AppCard>
    </>
   );
}

export default AddEmployee;