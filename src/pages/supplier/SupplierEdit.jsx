import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import SupplierEditForm from "../../features/supplier/SupplierEditForm";

function SupplierEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموردين", url: "/supplier" },
    { label: "تعديل مورد" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <SupplierEditForm />
      </AppCard>
    </>
  );
}

export default SupplierEdit;
