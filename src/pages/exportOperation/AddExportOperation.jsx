import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ExportAddForm from "../../features/exportOperation/ExportAddForm";

function AddExportOperation() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات التصدير", url: "/export" },
    { label: "اضافة عملية تصدير" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ExportAddForm />
      </AppCard>
    </>
  );
}

export default AddExportOperation;
