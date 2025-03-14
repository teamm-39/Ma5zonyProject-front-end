import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import SupplierAddForm from "../../features/supplier/SupplierAddForm";

function AddSupplier() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموردين", url: "/supplier" },
    {label:"اضافة مورد"}
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <SupplierAddForm />
    </AppCard>
    </>
   );
}

export default AddSupplier;