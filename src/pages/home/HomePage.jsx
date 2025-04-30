import "../../assets/css/HomePage.css";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard"
import ExportOperationsChart from "../../features/home/ExportOperationsChart";
import ImportOperationsChart from "../../features/home/ImportOperationsChart";
import ProductsTable from "../../features/home/ProductsTable";
function HomePage() {
  const items = [
    { label: "لوحة التحكم"},
  ];
  return (
    <AppCard>
      <AppBreadCrumb items={items} />
      <ProductsTable />
      <div className="d-flex gap-3">
      <ImportOperationsChart />
      <ExportOperationsChart />
</div>
   </AppCard>
  );
}

export default HomePage;