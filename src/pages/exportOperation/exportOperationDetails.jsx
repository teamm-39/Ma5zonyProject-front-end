import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ExportOperationDetailsForm from "../../features/exportOperation/ExportOperationDetailsForm";

function ExportOperationDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات البيع", url: "/export" },
    { label: "تفاصيل عملية البيع" },
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