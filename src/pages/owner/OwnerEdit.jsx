import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import OwnerEditForm from "../../features/owner/OwnerEditForm";

function OwnerEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الملاك", url: "/owner" },
    { label: "تعديل المالك" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <OwnerEditForm/>
      </AppCard>
    </>
  );
}

export default OwnerEdit;
