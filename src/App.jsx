import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // الموضوع
import "primereact/resources/primereact.min.css"; // الأسلوب العام للمكونات
import "primeicons/primeicons.css"; // أيقونات PrimeReact
import { PrimeReactProvider } from "primereact/api";
import HomePage from "./pages/home/HomePage.jsx";
import { Provider } from "react-redux";
import store from "./stores/reduxStore.js";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Layout from "./layouts/Layout.jsx";
import "./assets/css/global.css";
import { createContext, useRef } from "react";
import { Toast } from "primereact/toast";
import StoreRoutes from "./router/StoreRoutes.jsx";
import OwnerRoutes from "./router/OwnerRoutes.jsx";
export const ToastContext = createContext(null);
function App() {
  const toastRef = useRef(null);
  return (
    <>
      <PrimeReactProvider>
        <ToastContext.Provider value={toastRef}>
          <Toast ref={toastRef} />
          <Provider store={store}>
            <Routes>
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/" element={<PrivateRoutes child={<Layout />} />}>
                <Route index element={<HomePage />} />
                {StoreRoutes()}
                {OwnerRoutes()}
              </Route>
            </Routes>
          </Provider>
        </ToastContext.Provider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
