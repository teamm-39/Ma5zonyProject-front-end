import { useNavigate, useParams } from "react-router-dom";
import AppPagesCard from "../../components/AppPagesCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getImportOperation } from "./services/getImportOperation";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { Dropdown } from "primereact/dropdown";
import { getSuppliersForOperation } from "./services/getSuppliersForOperation";
import { getProductsForOperation } from "./services/getProductsForOperation";
import { getStoresForOperation } from "./services/getStoresForOperation";
import { getProductsAndStoresForOperationForEdit } from "./services/getProductsAndStoresForOperationForEdit";
import ImportAddFormStoreProduct from "./ImportAddFormStoreProduct";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { ImportOperationEdit } from "./services/ImportOperationEdit";

function ImportOperationEditForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);

  const { data, error, isError, isFetching } = useQuery({
    queryKey: ["getimportOperation"],
    queryFn: () => getImportOperation(id),
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

  const {
    data: sp,
    isFetching: spIsLoading,
    isError: spIsError,
    error: spError,
  } = useQuery({
    queryKey: ["getStoreProducts"],
    queryFn: () => getProductsAndStoresForOperationForEdit(id),
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
    suppliersError?.message,
    suppliersIsError,
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
    supplierId: null,
    sp: [],
  });

  useEffect(() => {
    if (data && sp) {
      setFormData((prev) => ({
        ...prev,
        supplierId: data?.data.supplierId,
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
  const { mutate,isPending } = useMutation({
    mutationKey: ["importOperationEdit"],
    mutationFn: ImportOperationEdit,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تعديل العمليه بنجاح",
        life: 3000,
      });
      navigate("/import");
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
      <AppPagesCard title="تعديل عملية شراء">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="input-container">
              <label htmlFor="supplierId">اسم المورد</label>
              <span className="star">*</span>
              <Dropdown
                id="supplierId"
                placeholder="اختر اسم المورد"
                options={suppliers?.data || []}
                optionLabel="name"
                optionValue="id"
                value={formData.supplierId}
                className={invalidSupplierId ? "p-invalid" : ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, supplierId: e.value }));
                  setInvalidSupplier(false);
                }}
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
                            toStoreId: store.storeId,
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
        <AppLoadingSpinner isLoading={isFetching||spIsLoading||isPending}/>
      </AppPagesCard>
      <div className="d-flex justify-content-end mt-2">
        <Button
          label="حفظ"
          className="btn-reuse"
          onClick={() => {
            if (!formData.supplierId) {
              setInvalidSupplier(true);
            } else if (formData.sp.length < 1) {
              setInvalidProductId(true)
              setInvalidQuentity(true)
              setInvalidStoreId(true)
            } else {
              mutate({id,formData});
              console.log("Before calling mutate...");
            }
          }}
        />
      </div>
    </>
  );
}

export default ImportOperationEditForm;
