import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import StoreEditForm from "../../features/store/StoreEditForm";
function StoreEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المخازن", url: "/store" },
    { label: "تعديل المخزن" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <StoreEditForm/>
      </AppCard>
    </>
  );
}

export default StoreEdit;
