import { Route } from "react-router-dom";
import StoresPage from "../pages/store/StoresPage";
import AddStore from "../pages/store/AddStore";
import StoreDetails from "../pages/store/StoreDetails";
import StoreEdit from "../pages/store/StoreEdit";

function StoreRoutes() {
  return (
    <>
      <Route path="/store" element={<StoresPage />} />
      <Route path="/store/new" element={<AddStore />} />
      <Route path="/store/details/:id" element={<StoreDetails />} />
      <Route path="/store/edit/:id" element={<StoreEdit />} />
    </>
  );
}

export default StoreRoutes;
