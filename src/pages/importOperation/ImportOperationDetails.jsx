import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ImportOperationDetailsForm from "../../features/importOperation/ImportOperationDetailsForm";

function ImportOperationDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات الاستيراد", url: "/import" },
    { label: "تفاصيل عملية الاستيراد" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ImportOperationDetailsForm />
      </AppCard>
    </>
  );
}

export default ImportOperationDetails;
