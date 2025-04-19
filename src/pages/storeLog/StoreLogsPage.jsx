import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";

function StoreLogsPage() {
  const items= [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير المخازن" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
    </AppCard>
    </>
   );
}

export default StoreLogsPage;