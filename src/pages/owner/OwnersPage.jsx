import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import OwnerFilter from "../../features/owner/OwnerFilter"
import OwnersTable from "../../features/owner/OwnersTable";
function OwnersPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الملاك" },
  ];
  const [filterValues, setFilterValues] = useState({
    name: "",
    userName: "",
    age: "",
    phone: "",
    address: "",
  });

  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <OwnerFilter onFilter={setFilterValues} />
        <OwnersTable filterValues={ filterValues} />
      </AppCard>
    </>
  );
}

export default OwnersPage;
