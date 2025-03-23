import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ImportOperationEditForm from "../../features/importOperation/ImportOperationEditForm";

function ImportOperationEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات الاستيراد", url: "/import" },
    { label: "تعديل عملية الاستيراد" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ImportOperationEditForm/>
    </AppCard>
    </>
   );
}

export default ImportOperationEdit;