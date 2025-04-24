import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getExportOperation } from "./services/getExportOperation";
import { getCustomersForOperation } from "./services/getCustomersForOperation";
import { getProductsForOperation } from "./services/getProductsForOperation";
import { getStoresForOperation } from "./services/getStoresForOperation";
import { getProductsAndStoresForEditOperatiom } from "./services/getProductsAndStoresForEditOpration";
import { exportOperationEdit } from "./services/exportOperationEdit";
import { Button } from "primereact/button";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import ExportAddTable from "./ExportAddTable";
import AppPagesCard from "../../components/AppPagesCard";
function ExportOperationEditForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);

  const { data, error, isError, isFetching } = useQuery({
    queryKey: ["getimportOperation"],
    queryFn: () => getExportOperation(id),
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
  const {
    data: sp,
    isFetching: spIsLoading,
    isError: spIsError,
    error: spError,
  } = useQuery({
    queryKey: ["getStoreProducts"],
    queryFn: () => getProductsAndStoresForEditOperatiom(id),
  });
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
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
    if (spIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: spError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [
    error,
    isError,
    data,
    toast,
    customersError?.message,
    customersIsError,
    productsError?.message,
    productsIsError,
    storesError?.message,
    storesIsError,
    spError?.message,
    spIsError,
  ]);
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
  useEffect(() => {
    if (data && sp) {
      setFormData((prev) => ({
        ...prev,
        customerId: data?.data.customerId,
        sp: sp?.data || [],
      }));
    }
  }, [data, sp]);

  const handleDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      sp: prev.sp.filter((_, i) => i !== index),
    }));
  };
  const [invalidSupplierId, setInvalidSupplier] = useState(false);
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
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["importOperationEdit"],
    mutationFn: exportOperationEdit,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تعديل العمليه بنجاح",
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
      <AppPagesCard title="تعديل عملية البيع">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="input-container">
              <label htmlFor="customerId">اسم المورد</label>
              <span className="star">*</span>
              <Dropdown
                id="customerId"
                placeholder="اختر اسم المورد"
                options={customers?.data || []}
                optionLabel="name"
                optionValue="id"
                value={formData.customerId}
                className={invalidSupplierId ? "p-invalid" : ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, customerId: e.value }));
                  setInvalidSupplier(false);
                }}
                style={{ paddingInlineEnd: "5px" }}
                panelClassName="custom-dropdown-panel"
                loading={customersIsLoading}
              />
              {invalidSupplierId && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ExportAddTable
            items={formData.sp}
            onDelete={handleDelete}
            title="المنتجات"
            isLoading={spIsLoading}
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
                            fromStoreId: store.storeId,
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
        <AppLoadingSpinner isLoading={isFetching || spIsLoading || isPending} />
      </AppPagesCard>
      <div className="d-flex justify-content-end mt-2">
        <Button
          label="حفظ"
          className="btn-reuse"
          onClick={() => {
            if (!formData.customerId) {
              setInvalidSupplier(true);
            } else if (formData.sp.length < 1) {
              setInvalidProductId(true);
              setInvalidQuentity(true);
              setInvalidStoreId(true);
            } else {
              mutate({ id, formData });
            }
          }}
        />
      </div>
    </>
  );
}

export default ExportOperationEditForm;
