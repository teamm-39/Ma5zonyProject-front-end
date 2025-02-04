import "../../assets/css/StoresPage.css";
import AppCard from "../../components/AppCard";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import StoreFilter from "../../features/store/StoreFilter";
import StoresTable from "../../features/store/StoresTable";
function StoresPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المخازن" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <StoreFilter />
        <StoresTable/>
      </AppCard>
    </>
  );
}

export default StoresPage;
