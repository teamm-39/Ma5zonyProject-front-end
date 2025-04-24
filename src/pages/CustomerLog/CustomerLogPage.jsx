import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";

function CustomerLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير العملاء" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
      </AppCard>
    </>
  );
}

export default CustomerLogsPage;
