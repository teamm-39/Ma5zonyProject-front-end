import { Route } from "react-router-dom";
import StoresPage from "../pages/store/StoresPage";
import AddStore from "../pages/store/AddStore";
import StoreDetails from "../pages/store/StoreDetails";
import StoreEdit from "../pages/store/StoreEdit";

function StoreRoutes() {
  return (
    <>
      <Route path="/store">
        <Route index element={<StoresPage />} />
        <Route path="new" element={<AddStore />} />
        <Route path="details/:id" element={<StoreDetails />} />
        <Route path="edit/:id" element={<StoreEdit />} />
      </Route>
    </>
  );
}

export default StoreRoutes;
