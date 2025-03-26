import AppCard from "../../components/AppCard";
import AppBreadcrumb from "../../components/AppBreadCrumb";
import CustomerEditForm from "../../features/customer/CustomerEditForm";
function CustomerEdit() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة العملاء", url: "/customer" },
    { label: "تعديل عميل" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadcrumb items={items} />
        <CustomerEditForm />
      </AppCard>
    </>
  );
}

export default CustomerEdit;
