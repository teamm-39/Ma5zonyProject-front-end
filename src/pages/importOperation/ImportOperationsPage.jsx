import { useState } from "react";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ImportOperationFilter from "../../features/importOperation/ImportOperationFilter";
import ImportOperationsTable from "../../features/importOperation/ImportOperationsTable";

function ImportOperationsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "عمليات الاستيراد" },
  ];
    const [filterValues, setFilterValues] = useState({
      userName: "",
      supplierName: "",
      date: null,
    });
  // if (field === "date" && value) {
    //   value = new Date(value).toLocaleDateString("en-GB");
    // }
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ImportOperationFilter onFilter={setFilterValues} />
        <ImportOperationsTable filterValues={filterValues} />
      </AppCard>
    </>
  );
}

export default ImportOperationsPage;
