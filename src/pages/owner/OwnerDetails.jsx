import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import OwnerDetailsForm from "../../features/owner/OwnerDetailsForm";

function OwnerDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الملاك", url: "/owner" },
    {label:"تفاصيل المالك"}
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <OwnerDetailsForm/>
    </AppCard>
    </>
   );
}

export default OwnerDetails;