import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import CustomerDetailsForm from "../../features/customer/CustomerDetailsForm";

function CustomerDetails() {
    const items = [
      { label: "لوحة التحكم", url: "/" },
      { label: "ادارة العملاء", url: "/customer" },
      { label: "تفاصيل العميل" },
    ];
  return (
    <>
      <AppCard>
    <AppBreadCrumb items={items} />
    <CustomerDetailsForm/>
      </AppCard>
    </>
   );
}

export default CustomerDetails;