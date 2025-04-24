import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ExportOperationEditForm from "../../features/exportOperation/ExportOperationEditForm";

function ExportOperationEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات البيع", url: "/export" },
    { label: "تعديل عملية البيع" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ExportOperationEditForm />
      </AppCard>
    </>
  );
}

export default ExportOperationEdit;
