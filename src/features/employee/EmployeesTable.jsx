import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ToastContext } from "../../App";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployees } from "./services/getEmployees";
import AppTable from "../../components/AppTable";
import { Column } from "primereact/column";
import tableIcon from "../../assets/icons/table-icon.svg";
import blankProfile from "../../assets/imgs/blank-profile.png";
import AppTableActions from "../../components/AppTableActions";
import deleteEmployee from "./services/deleteEmployee";
function EmployeesTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching } = useQuery({
    queryKey: [
      "employees",
      pageNumber,
      pageSize,
      filterValues.name,
      filterValues.userName,
      filterValues.age,
      filterValues.phone,
      filterValues.address,
    ],
    queryFn: () => getEmployees(pageNumber, pageSize, filterValues),
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف الموظف بنجاح",
        life: 3000,
      });
      queryClient.invalidateQueries(["employees"]);
    },
    onError: (e) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: e.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    },
  });
  return (
    <>
      <AppTable
        data={data?.data}
        title="الموظفين"
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        total={data?.total}
        isLoading={isFetching}
        addUrl="/employee/new"
      >
        <Column
          header="#"
          field="imgUrl"
          body={(rowData) =>
            rowData.imgUrl && rowData.imgUrl.trim() !== "" ? (
              <img
                src={`${import.meta.env.VITE_PROFILE_IMGS}${rowData.imgUrl}`}
                alt="صورة الموظف"
                onError={(e) => (e.target.src = blankProfile)}
                className="table-profile-img"
              />
            ) : (
              <img
                src={blankProfile}
                alt="صورة الموظف"
                className="table-profile-img"
              />
            )
          }
        />
        <Column header="اسم المالك" field="name" />
        <Column header="اسم المستخدم" field="userName" />
        <Column
          header="عمر المالك"
          field="age"
          body={(rowData) =>
            rowData.age && rowData.age > 0 ? rowData.age : "لم يتم ادخال العمر"
          }
        />
        <Column
          header="رقم الهاتف"
          field="phone"
          body={(rowData) =>
            rowData.phoneNumber && rowData.phoneNumber.trim() !== ""
              ? rowData.phoneNumber
              : "لم يتم ادخال رقم الهاتف"
          }
        />
        <Column
          header="مكان الاقامه"
          field="address"
          body={(rowData) =>
            rowData.address && rowData.address.trim() !== ""
              ? rowData.address
              : "لم يتم ادخال مكان الاقامه"
          }
        />
        <Column header="البريد الالكترونى" field="email" />
        <Column
          header={<img src={tableIcon} alt="table icon"></img>}
          style={{ width: "8rem" }}
          body={(rowData) => (
            <AppTableActions
              rowData={rowData}
              details={`/employee/details/${rowData.id}`}
              edit={`/employee/edit/${rowData.id}`}
              onDelete={() => mutate(rowData.id)}
            />
          )}
        />
      </AppTable>
    </>
  );
}
EmployeesTable.propTypes = {
  filterValues: PropTypes.shape({
    name: PropTypes.string,
    userName: PropTypes.string,
    age: PropTypes.string || PropTypes.number || null,
    phone: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};
export default EmployeesTable;
