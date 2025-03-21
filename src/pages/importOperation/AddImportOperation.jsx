import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ImportAddForm from "../../features/importOperation/ImportAddForm";

function AddImportOperation() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات الاستيراد", url: "/import" },
    { label: "اضافة عملية استيراد" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ImportAddForm />
      </AppCard>
    </>
  );
}

export default AddImportOperation;
