import { Route } from "react-router-dom";
import OwnersPage from "../pages/owner/OwnersPage";
import AddOwner from "../pages/owner/AddOwner";
import OwnerDetails from "../pages/owner/OwnerDetails";
import OwnerEdit from "../pages/owner/OwnerEdit";

function OwnerRoutes() {
  return (
    <>
      <Route path="/owner">
        <Route index element={<OwnersPage />} />
        <Route path="new" element={<AddOwner />}/>
        <Route path="details/:id" element={<OwnerDetails />}/>
        <Route path="edit/:id" element={<OwnerEdit />}/>
      </Route>
    </>
  );
}

export default OwnerRoutes;
