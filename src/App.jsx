import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // الموضوع
import "primereact/resources/primereact.min.css"; // الأسلوب العام للمكونات
import "primeicons/primeicons.css"; // أيقونات PrimeReact
import { PrimeReactProvider } from "primereact/api";
import HomePage from "./pages/home/HomePage.jsx";
import Layout from "./layouts/Layout.jsx";
import "./assets/css/global.css";
import { createContext, useRef } from "react";
import { Toast } from "primereact/toast";
import StoreRoutes from "./router/StoreRoutes.jsx";
import OwnerRoutes from "./router/OwnerRoutes.jsx";
import EmployeeRoutes from "./router/EmployeeRoutes.jsx";
import PrivateRoute from "./features/auth/PrivateRoutes.jsx";
import ProductRoutes from "./router/ProductRoutes.jsx";
import SupplierRoutes from "./router/SupplierRoutes.jsx";
import ImportOperationRoutes from "./router/ImportOperationRoutes.jsx";
import CustomerRoutes from "./router/CustomerRoutes.jsx";
import ExportOperationRoutes from "./router/ExportOperationRoutes.jsx";
import StoreLogsPage from "./pages/storeLog/StoreLogsPage.jsx";
import ProductLogsPage from "./pages/productLog/ProductLogsPage.jsx";
import CustomerLogsPage from "./pages/customerLog/CustomerLogsPage.jsx";
import SupplierLogsPage from "./pages/supplierLog/SupplierLogsPage.jsx";
export const ToastContext = createContext(null);
function App() {
  const toastRef = useRef(null);
  return (
    <>
      <PrimeReactProvider>
        <ToastContext.Provider value={toastRef}>
          <Toast ref={toastRef} />
          <Routes>
            <Route path="/Login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                {StoreRoutes()}
                {OwnerRoutes()}
                {EmployeeRoutes()}
                {ProductRoutes()}
                {SupplierRoutes()}
                {CustomerRoutes()}
                {ImportOperationRoutes()}
                {ExportOperationRoutes()}
                <Route path="/logs/store" element={<StoreLogsPage />} />
                <Route path="/logs/product" element={<ProductLogsPage />} />
                <Route path="/logs/supplier" element={<SupplierLogsPage />} />
                <Route path="/logs/customer" element={<CustomerLogsPage />} />
              </Route>
            </Route>
          </Routes>
        </ToastContext.Provider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
