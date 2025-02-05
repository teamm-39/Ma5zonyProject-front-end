import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import StoreDetailsForm from "../../features/store/StoreDetailsForm";
function StoreDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المخازن", url: "/store" },
    { label: "تفاصيل المخزن" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <StoreDetailsForm />
      </AppCard>
    </>
  );
}

export default StoreDetails;
