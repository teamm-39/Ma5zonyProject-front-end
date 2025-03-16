import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSuppliers } from "./services/getSuppliers";
import AppTable from "../../components/AppTable";
import { Column } from "primereact/column";
import AppIsActiveBtn from "../../components/AppIsActiveBtn";
import AppIsNotActiveBtn from "../../components/AppIsNotActiveBtn";
import AppTableActions from "../../components/AppTableActions";
import tableIcon from "../../assets/icons/table-icon.svg";
import { deleteSupplier } from "./services/deleteSupplier";

function SuppliersTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "suppliers",
      pageNumber,
      pageSize,
      filterValues.name,
      filterValues.age,
      filterValues.numOfDeal,
      filterValues.address,
      filterValues.isReliable,
      filterValues.phoneNum,
      filterValues.email,
    ],
    queryFn: () => getSuppliers(pageNumber, pageSize, filterValues),
  });
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [error, toast, isError]);
  const queryClient =useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف المورد بنجاح",
        life: 3000,
      });
      queryClient.invalidateQueries(["suppliers"]);
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  });
  return (
    <>
      <AppTable
        title="الموردين"
        data={data?.data}
        total={data?.total}
        isLoading={isFetching || isPending}
        onPageChange={handlePageChange}
        pageNumber={pageNumber}
        pageSize={pageSize}
        addUrl="/supplier/new"
      >
        <Column header="#" field="supplierId" />
        <Column header="اسم المورد" field="name" />
        <Column header="عمر المورد" field="age" />
        <Column header="مكان المورد" field="address" />
        <Column header="رقم الهاتف" field="phoneNumber" />
        <Column header="البريد الالكتروني" field="email" />
        <Column header="عدد الصفقات" field="numOfDeal" />
        <Column
          header="موثوق به"
          className="d-flex justify-content-center"
          field="isReliable"
          body={(rowData) => {
            if (rowData.isReliable==true) {
              return <AppIsActiveBtn text="نعم" />;
            } else if (rowData.isReliable == false) {
              return <AppIsNotActiveBtn text="لا" />
            }
          }}
        />
        <Column
                  header={<img src={tableIcon} alt="table icon"></img>}
                  style={{ width: "8rem" }}
                  body={(rowData) => (
                    <AppTableActions
                      rowData={rowData}
                      details={`/supplier/details/${rowData.supplierId}`}
                      edit={`/supplier/edit/${rowData.supplierId}`}
                      onDelete={() => mutate(rowData.supplierId)
                      }
                    />
                  )}
                />
      </AppTable>
    </>
  );
}
SuppliersTable.propTypes = {
  filterValues: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
    numOfDeal: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
    address: PropTypes.string,
    isReliable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    phoneNum: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
export default SuppliersTable;
