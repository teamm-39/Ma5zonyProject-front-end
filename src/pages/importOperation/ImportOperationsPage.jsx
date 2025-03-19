import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ImportOperationFilter from "../../features/importOperation/ImportOperationFilter";

function ImportOperationsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات الاستيراد" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ImportOperationFilter />
      </AppCard>
    </>
  );
}

export default ImportOperationsPage;
