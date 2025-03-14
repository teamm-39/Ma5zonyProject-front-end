import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import SupplierFilter from "../../features/supplier/SupplierFilter";
import SuppliersTable from "../../features/supplier/SuppliersTable";

function SuppliersPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة الموردين" },
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
        <SupplierFilter onFilter={setFilterValues} />
        <SuppliersTable filterValues={filterValues}/>
      </AppCard>
    </>
  );
}

export default SuppliersPage;
