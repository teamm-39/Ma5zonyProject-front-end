import { Route } from "react-router-dom";
import OwnersPage from "../pages/owner/OwnersPage";

function OwnerRoutes() {
  return (
    <>
      <Route path="/owner">
      <Route index element={<OwnersPage />} />
      </Route>
    </>
  );
}

export default OwnerRoutes;
