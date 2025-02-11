import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import OwnerAddForm from "../../features/owner/OwnerAddForm";

function AddOwner() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الملاك", url: "/owner" },
    {label:"اضافة مالك"}
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <OwnerAddForm />
    </AppCard>
    </>
   );
}

export default AddOwner;