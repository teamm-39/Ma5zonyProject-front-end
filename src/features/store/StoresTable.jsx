import { Column } from "primereact/column";
import PropTypes from 'prop-types';
import AppTable from "../../components/AppTable";
import AppTableActions from "../../components/AppTableActions";
import tableIcon from "../../assets/icons/table-icon.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStores } from "./services/getStores";
import { useContext, useState } from "react";
import {deleteStore} from "./services/deleteStore"
import { ToastContext } from "../../App";
function StoresTable({filterValues}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isFetching } = useQuery({
    queryKey: ["stores", pageNumber, pageSize,filterValues.name,filterValues.country,filterValues.city],
    queryFn: () => getStores(pageNumber, pageSize,filterValues.name,filterValues.country,filterValues.city),
  });
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const queryClient = useQueryClient();
  const toast=useContext(ToastContext)
  const { mutate, isPending } = useMutation({
    mutationFn: deleteStore,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف المخزن بنجاح",
        life: 3000,
      });
      queryClient.invalidateQueries(["stores"])
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.meesage || "حدث خطأ غير متوقع",
        life: 3000,
      })
    }
  });
  return (
    <>
      <AppTable
        title={"المخازن"}
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        data={data?.data}
        total={data?.total}
        isLoading={isFetching||isPending}
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
              details={`/store/details/${rowData.storeId}`}
              edit={`/store/edit/${rowData.storeId}`}
              onDelete={() => mutate(rowData.storeId) }
            />
          )}
        />
      </AppTable>
    </>
  );
}
StoresTable.propTypes = {
  filterValues: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    city:PropTypes.string
  }).isRequired
};

export default StoresTable;
