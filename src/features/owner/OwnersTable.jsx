import { useContext, useState } from "react";
import AppTable from "../../components/AppTable";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getOwners } from "./services/getOwners";
import { ToastContext } from "../../App";
import { Column } from "primereact/column";
import blankProfile from "../../assets/imgs/blank-profile.png";
import tableIcon from "../../assets/icons/table-icon.svg";
import AppTableActions from "../../components/AppTableActions";

function OwnersTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching } = useQuery({
    queryKey: [
      "owners",
      pageNumber,
      pageSize,
      filterValues.name,
      filterValues.userName,
      filterValues.age,
      filterValues.phone,
      filterValues.address,
    ],
    queryFn: () => getOwners(pageNumber, pageSize, filterValues, toast),
  });
  return (
    <>
      <AppTable
        title="الملاك"
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        data={data?.data}
        total={data?.total}
        isLoading={isFetching}
        addUrl="/owner/new"
      >
        <Column
          header="#"
          field="imgUrl"
          body={(rowData) =>
            rowData.imgUrl && rowData.imgUrl.trim() !== "" ? (
              <img src={`${import.meta.env.VITE_PROFILE_IMGS}${rowData.imgUrl}`} alt="صورة المالك" onError={(e) => (e.target.src = blankProfile)} className="table-profile-img" />
            ) : (
              <img src={blankProfile}  alt="صورة المالك" className="table-profile-img" />
            )
          }
        />
        <Column header="اسم المالك" field="name" />
        <Column header="اسم المستخدم" field="userName" />
        <Column header="عمر المالك" field="age" body={(rowData) =>
          rowData.age&&rowData.age>0?(rowData.age):("لم يتم ادخال العمر")
        } />
        <Column header="رقم الهاتف" field="phone" body={(rowData) =>
          rowData.phoneNumber && rowData.phoneNumber.trim() !==""? (
            rowData.phoneNumber
          ):("لم يتم ادخال رقم الهاتف")
        } />
        <Column header="مكان الاقامه" field="address" body={(rowData) =>
          rowData.address && rowData.address.trim() !==""? (
            rowData.address
          ):("لم يتم ادخال مكان الاقامه")
        } />
        <Column header="البريد الالكترونى" field="email" />
        <Column
                  header={<img src={tableIcon} alt="table icon"></img>}
                  style={{ width: "8rem" }}
                  body={(rowData) => (
                    <AppTableActions
                      rowData={rowData}
                      details={`/owner/details/${rowData.id}`}
                      edit={`/owner/edit/${rowData.id}`}
                      // onDelete={() => mutate(rowData.storeId,toast) }
                    />
                  )}
                />
      </AppTable>
    </>
  );
}
OwnersTable.propTypes = {
  filterValues: PropTypes.shape({
    name: PropTypes.string,
    userName: PropTypes.string,
    age:PropTypes.string|| PropTypes.number||null,
    phone: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};
export default OwnersTable;
