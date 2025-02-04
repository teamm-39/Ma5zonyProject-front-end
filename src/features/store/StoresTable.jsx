import { Column } from "primereact/column";
import AppTable from "../../components/AppTable";
import AppTableActions from "../../components/AppTableActions";
import tableIcon from "../../assets/icons/table-icon.svg";
import { useQuery } from "@tanstack/react-query";
import { getStores } from "./services/getStores";
import { useState } from "react";

function StoresTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isFetching } = useQuery({
    queryKey: ["storesData", pageNumber, pageSize],
    queryFn: () => getStores(pageNumber, pageSize),
  });
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  return (
    <>
      <AppTable
        title={"المخازن"}
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        data={data?.data}
        total={data?.total}
        isLoading={isFetching}
        addUrl="/store/new"
      >
        <Column header="#" field="storeId" />
        <Column header="اسم المخزن" field="name" />
        <Column header="الدوله" field="country" />
        <Column header="المدينه" field="city" />
        <Column
          header={<img src={tableIcon} alt="table icon"></img>}
          style={{ width: "8rem" }}
          body={(rowData) => (
            <AppTableActions
              rowData={rowData}
              details="/store/details"
              edit="/store/edit"
              onDelete={(id) => console.log("Delete item with ID:", id)}
            />
          )}
        />
      </AppTable>
    </>
  );
}

export default StoresTable;
