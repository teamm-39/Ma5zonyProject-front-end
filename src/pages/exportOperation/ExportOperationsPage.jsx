import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ExportOperationFilter from "../../features/exportOperation/ExportOperationFilter";
import ExportOperationsTable from "../../features/exportOperation/ExportOperationsTable";

function ExportOperationsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات البيع" },
  ];
    const [filterValues, setFilterValues] = useState({
      userName: "",
      customerName: "",
      date: null,
    });
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ExportOperationFilter onFilter={setFilterValues} />
        <ExportOperationsTable filterValues={filterValues} />
      </AppCard>
    </>
  );
}

export default ExportOperationsPage;
