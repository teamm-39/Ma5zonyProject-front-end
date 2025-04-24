import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ImportOperationEditForm from "../../features/importOperation/ImportOperationEditForm";

function ImportOperationEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات شراء", url: "/import" },
    { label: "تعديل عملية الشراء" },
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