import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";

function ProductLogsPage() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "تقارير المنتجات" },
  ];
  return (
    <AppCard>
      <AppBreadCrumb items={items} />
    </AppCard>
  );
}

export default ProductLogsPage;
