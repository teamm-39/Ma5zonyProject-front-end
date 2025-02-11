import { Route } from "react-router-dom";
import OwnersPage from "../pages/owner/OwnersPage";
import AddOwner from "../pages/owner/AddOwner";
import OwnerDetails from "../pages/owner/OwnerDetails";

function OwnerRoutes() {
  return (
    <>
      <Route path="/owner">
        <Route index element={<OwnersPage />} />
        <Route path="new" element={<AddOwner />}/>
        <Route path="details/:id" element={<OwnerDetails />}/>
      </Route>
    </>
  );
}

export default OwnerRoutes;
