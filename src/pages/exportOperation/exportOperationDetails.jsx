import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ExportOperationDetailsForm from "../../features/exportOperation/ExportOperationDetailsForm";

function ExportOperationDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات التصدير", url: "/export" },
    { label: "تفاصيل عملية التصدير" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ExportOperationDetailsForm  />
</AppCard>
    </>
   );
}

export default ExportOperationDetails;