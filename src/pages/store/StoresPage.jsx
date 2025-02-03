import "../../assets/css/StoresPage.css";
import AppBreadCrumb from "../../components/AppBreadCrumb";
function StoresPage() {
  const items=[
    { label: "لوحة التحكم",url:"/" },
    { label: "Store List" },
  ];
  return (
    <>
      <AppBreadCrumb items={items} />
    </>
  );
}

export default StoresPage;
