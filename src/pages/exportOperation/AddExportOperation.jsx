import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ExportAddForm from "../../features/exportOperation/ExportAddForm";

function AddExportOperation() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات البيع", url: "/export" },
    { label: "اضافة عملية بيع" },
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
