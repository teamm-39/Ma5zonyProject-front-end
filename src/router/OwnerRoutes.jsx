import { Route } from "react-router-dom";
import OwnersPage from "../pages/owner/OwnersPage";
import AddOwner from "../pages/owner/AddOwner";

function OwnerRoutes() {
  return (
    <>
      <Route path="/owner">
        <Route index element={<OwnersPage />} />
        <Route path="new" element={<AddOwner />}/>
      </Route>
    </>
  );
}

export default OwnerRoutes;
