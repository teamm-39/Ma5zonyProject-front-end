import { Route } from "react-router-dom";
import ImportOperationsPage from "../pages/importOperation/ImportOperationsPage";

function ImportOperationRoutes() {
  return (
    <>
    <Route path="/import" element={<ImportOperationsPage />} />
    {/* <Route path="/owner/new" element={<AddOwner />} />
    <Route path="/owner/details/:id" element={<OwnerDetails />} />
    <Route path="/owner/edit/:id" element={<OwnerEdit />} /> */}
  </>
   );
}

export default ImportOperationRoutes;