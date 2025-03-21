import { useQuery } from "@tanstack/react-query";
import AppPagesCard from "../../components/AppPagesCard";
import { Dropdown } from "primereact/dropdown";
import { getSuppliersForOperation } from "./services/getSuppliersForOperation";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import ImportAddFormStoreProduct from "./ImportAddFormStoreProduct";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getProductsForOperation } from "./services/getProductsForOperation";
import { getStoresForOperation } from "./services/getStoresForOperation";

function ImportAddForm() {
  const toast = useContext(ToastContext);
  const [product, setProduct] = useState({
    productId: null,
    productName: null,
    price: null,
  });
  const [store, setStore] = useState({
    storeId: null,
    storeName: null,
  });
  const [quantity, setQuantity] = useState("");
  const [formData, setFormData] = useState({
    supplierId: null,
    sp: [],
  });
  const {
    data: suppliers,
    isFetching: suppliersIsLoading,
    error: suppliersError,
    isError: suppliersIsError,
  } = useQuery({
    queryKey: ["getSuppliersForOperation"],
    queryFn: getSuppliersForOperation,
  });
  const {
    data: products,
    isFetching: productsIsLoading,
    error: productsError,
    isError: productsIsError,
  } = useQuery({
    queryKey: ["getProductsForOperation"],
    queryFn: getProductsForOperation,
  });
  const {
    data: stores,
    isFetching: storesIsLoading,
    error: storesError,
    isError: storesIsError,
  } = useQuery({
    queryKey: ["getStoresForOperation"],
    queryFn: getStoresForOperation,
  });
  useEffect(() => {
    if (suppliersIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: suppliersError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
    if (productsIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: productsError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
    if (storesIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: storesError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [
    toast,
    suppliersIsError,
    suppliersError,
    productsIsError,
    productsError,
    storesIsError,
    storesError,
  ]);

  const [invalidSupplierId, setInvalidSupplier] = useState(false);

  const [invalidItems, setInvalidItems] = useState(false);
  useEffect(() => {
    const isValid =
      product &&
      product.productId &&
      store &&
      store.storeId &&
      parseInt(quantity) > 0;

    setInvalidItems(!isValid);
  }, [product, store, quantity]);
  const handleDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      sp: prev.sp.filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      <AppPagesCard title="اضافة عملية استيراد">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="input-container">
              <label htmlFor="supplierId">اسم المورد</label>
              <span className="star">*</span>
              <Dropdown
                id="supplierId"
                placeholder="اختر اسم المورد"
                options={suppliers?.data || []}
                optionLabel="supplierName"
                optionValue="supplierId"
                value={formData.supplierId}
                className={invalidSupplierId ? "p-invalid" : ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, supplierId: e.value }))
                }
                style={{ paddingInlineEnd: "5px" }}
                panelClassName="custom-dropdown-panel"
                loading={suppliersIsLoading}
              />
              {invalidSupplierId && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ImportAddFormStoreProduct
            title="اضافة المنتجات"
            items={formData.sp}
            onDelete={handleDelete}
          >
            <div className="row mt-4">
              <div className="col-12 col-md-4">
                <div className="input-container">
                  <label htmlFor="productId">اسم المنتج</label>
                  <span className="star">*</span>
                  <Dropdown
                    id="productId"
                    placeholder="اختر اسم المنتج"
                    options={products?.data || []}
                    optionLabel="productName"
                    value={product}
                    className={invalidSupplierId ? "p-invalid" : ""}
                    onChange={(e) => {
                      setProduct(e.value);
                    }}
                    style={{ paddingInlineEnd: "5px" }}
                    panelClassName="custom-dropdown-panel"
                    loading={productsIsLoading}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="input-container">
                  <label htmlFor="storeId">اسم المخزن</label>
                  <span className="star">*</span>
                  <Dropdown
                    id="storeId"
                    placeholder="اختر اسم المخزن"
                    options={stores?.data || []}
                    optionLabel="storeName"
                    value={store}
                    onChange={(e) => setStore(e.value)}
                    style={{ paddingInlineEnd: "5px" }}
                    panelClassName="custom-dropdown-panel"
                    loading={storesIsLoading}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="input-container">
                  <label htmlFor="quantity">ادخل الكميه</label>
                  <span className="star">*</span>
                  <InputText
                    id="quantity"
                    keyfilter="int"
                    value={quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setQuantity(value);
                      }
                    }}
                    placeholder="ادخل الكميه"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <Button
                  label="اضافه"
                  className="btn-reuse"
                  disabled={invalidItems}
                  onClick={() => {
                    if (product.productId && store.storeId && quantity) {
                      setFormData((prev) => ({
                        ...prev,
                        sp: [
                          ...prev.sp,
                          {
                            productId: product.productId,
                            productName: product.productName,
                            price: product.price,
                            storeId: store.storeId,
                            storeName: store.storeName,
                            quantity: quantity,
                          },
                        ],
                      }));
                      setProduct({
                        productId: null,
                        productName: null,
                        price: null,
                      });
                      setStore({
                        storeId: null,
                        storeName: null,
                      });
                      setQuantity("");
                    }
                  }}
                />
              </div>
            </div>
          </ImportAddFormStoreProduct>
        </div>
      </AppPagesCard>
    </>
  );
}

export default ImportAddForm;
