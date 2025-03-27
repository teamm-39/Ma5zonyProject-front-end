import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCustomersForOperation } from "./services/getCustomersForOperation";
import { getProductsForOperation } from "./services/getProductsForOperation";
import { getStoresForOperation } from "./services/getStoresForOperation";
import { addExportOperation } from "./services/addExportOperation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import ExportAddTable from "./ExportAddTable";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import AppPagesCard from "../../components/AppPagesCard";
import { useNavigate } from "react-router-dom";

function ExportAddForm() {
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
    customerId: null,
    sp: [],
  });
  const {
    data: customers,
    isFetching: customersIsLoading,
    error: customersError,
    isError: customersIsError,
  } = useQuery({
    queryKey: ["getCustomersForOperation"],
    queryFn: getCustomersForOperation,
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
    if (customersIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: customersError?.message || "حدث خطأ غير متوقع",
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
    customersError,
    customersIsError,
    productsIsError,
    productsError,
    storesIsError,
    storesError,
  ]);
  const [invalidCustomerId, setInvalidCustomerId] = useState(false);
  const [invalidProductId, setInvalidProductId] = useState(false);
  const [invalidStoreId, setInvalidStoreId] = useState(false);
  const [invalidQuentity, setInvalidQuentity] = useState(false);
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
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addImportOperation"],
    mutationFn: addExportOperation,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تمت اضافة العمليه بنجاح",
        life: 3000,
      });
      navigate("/export");
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
      <AppPagesCard title="اضافة عملية تصدير">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="input-container">
              <label htmlFor="customerId">اسم العميل</label>
              <span className="star">*</span>
              <Dropdown
                id="customerId"
                placeholder="اختر اسم العميل"
                options={customers?.data || []}
                optionLabel="name"
                optionValue="id"
                value={formData.customerId}
                className={invalidCustomerId ? "p-invalid" : ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, customerId: e.value }));
                  setInvalidCustomerId(false);
                }}
                style={{ paddingInlineEnd: "5px" }}
                panelClassName="custom-dropdown-panel"
                loading={customersIsLoading}
              />
              {invalidCustomerId && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ExportAddTable
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
                    className={invalidProductId ? "p-invalid" : ""}
                    onChange={(e) => {
                      setProduct(e.value);
                      setInvalidProductId(false);
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
                    className={invalidStoreId ? "p-invalid" : ""}
                    value={store}
                    onChange={(e) => {
                      setStore(e.value);
                      setInvalidStoreId(false);
                    }}
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
                    className={invalidQuentity ? "p-invalid" : ""}
                    keyfilter="int"
                    value={quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setQuantity(value);
                        setInvalidQuentity(false);
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
          </ExportAddTable>
        </div>
      </AppPagesCard>
      <div className="d-flex justify-content-end mt-2">
        <Button
          label="حفظ"
          className="btn-reuse"
          onClick={() => {
            if (!formData.customerId) {
              setInvalidCustomerId(true);
            } else if (formData.sp.length < 1) {
              setInvalidProductId(true);
              setInvalidQuentity(true);
              setInvalidStoreId(true);
            } else {
              mutate(formData);
            }
          }}
        />
      </div>
      <AppLoadingSpinner isLoading={isPending} />
    </>
  );
}

export default ExportAddForm;
