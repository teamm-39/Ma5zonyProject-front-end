import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import ProductDetailsForm from "../../features/product/ProductDetailsForm";

function ProductDetails() {
  const items = [
    { label: "لوحة التحكم", url: "/" },
    { label: "ادارة المنتجات", url: "/product" },
    { label: "تفاصيل المنتج" },
  ];
  return (
    <>
    <AppCard>
      <AppBreadCrumb items={items} />
      <ProductDetailsForm />
    </AppCard>
      </>
   );
}

export default ProductDetails;