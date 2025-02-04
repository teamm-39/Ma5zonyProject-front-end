import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import StoreAddForm from "../../features/store/StoreAddForm";

function AddStore() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المخازن", url: "/store" },
    { label: "اضافة مخزن" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <StoreAddForm />
      </AppCard>
    </>
  );
}

export default AddStore;
