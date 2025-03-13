import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ProductEditForm from "../../features/product/ProductEditForm";

function ProductEdit() {
  const item = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المنتجات", url: "/product" },
    { label: "تعديل منتج" },
  ];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={item} />
        <ProductEditForm />
      </AppCard>
    </>
  );
}

export default ProductEdit;
