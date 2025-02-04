import { Column } from "primereact/column";
import AppTable from "../../components/AppTable";
import AppTableActions from "../../components/AppTableActions";
import tableIcon from "../../assets/icons/table-icon.svg";

function StoresTable() {
  const values = [
    { id: 1, name: "sss", city: "mans", country: "egy" },
    { id: 1, name: "sss", city: "mans", country: "egy" },
  ];
  return (
    <>
      <AppTable title={"المخازن"} data={values} total={2}>
        <Column header="#" field="id" />
        <Column header="اسم المخزن" field="name" />
        <Column header="الدوله" field="country" />
        <Column header="المدينه" field="city" />
        <Column
          header={
            <img src={tableIcon} alt="table icon"></img>
        }
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
