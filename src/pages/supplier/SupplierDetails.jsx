import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import SupplierDetailsForm from "../../features/supplier/SupplierDetailsForm";

function SupplierDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموردين", url: "/supplier" },
    { label: "تفاصيل المورد" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <SupplierDetailsForm/>
      </AppCard>
    </>
  );
}

export default SupplierDetails;
