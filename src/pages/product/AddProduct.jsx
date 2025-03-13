import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ProductAddForm from "../../features/product/ProductAddForm";

function AddProduct() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المنتجات", url: "/product" },
    { label: "اضافة منتج" },
  ]
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items} />
        <ProductAddForm />
      </AppCard>
    </>
   );
}

export default AddProduct;