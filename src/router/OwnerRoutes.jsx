import { Route } from "react-router-dom";
import OwnersPage from "../pages/owner/OwnersPage";
import AddOwner from "../pages/owner/AddOwner";
import OwnerDetails from "../pages/owner/OwnerDetails";
import OwnerEdit from "../pages/owner/OwnerEdit";

function OwnerRoutes() {
  return (
    <>
      <Route path="/owner" element={<OwnersPage />} />
      <Route path="/owner/new" element={<AddOwner />} />
      <Route path="/owner/details/:id" element={<OwnerDetails />} />
      <Route path="/owner/edit/:id" element={<OwnerEdit />} />
    </>
  );
}

export default OwnerRoutes;
