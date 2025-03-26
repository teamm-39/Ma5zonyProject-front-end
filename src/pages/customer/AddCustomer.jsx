import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import CustomerAddForm from "../../features/customer/CustomerAddForm";
function AddCustomer() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة العملاء", url: "/customer" },
    { label: "اضافة عميل" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <CustomerAddForm />
      </AppCard>
    </>
  );
}

export default AddCustomer;
