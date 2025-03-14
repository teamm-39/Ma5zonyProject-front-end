import { useEffect, useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import SupplierFilter from "../../features/supplier/SupplierFilter";

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
  useEffect(() => {
    console.log(filterValues);
  }
  , [filterValues]);
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <SupplierFilter onFilter={setFilterValues} />
      </AppCard>
    </>
  );
}

export default SuppliersPage;
