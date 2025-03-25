import AppCard from "../../components/AppCard";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import CustomerFilter from "../../features/customer/CustomerFilter";
import { useState } from "react";
import CustomersTable from "../../features/customer/CustomersTable";

function CustomersPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة العملاء" },
  ];
  const [filterValues, setFilterValues] = useState({
    name: "",
    age: "",
    address: "",
    numOfDeal: "",
    isReliable: "",
    phoneNum: "",
    email: "",
  });

  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <CustomerFilter onFilter={setFilterValues} />
        <CustomersTable filterValues={filterValues} />
      </AppCard>
    </>
  );
}

export default CustomersPage;
