import { Route } from "react-router-dom";
import ImportOperationsPage from "../pages/importOperation/ImportOperationsPage";
import AddImportOperation from "../pages/importOperation/AddImportOperation";
import ImportOperationDetails from "../pages/importOperation/ImportOperationDetails";

function ImportOperationRoutes() {
  return (
    <>
    <Route path="/import" element={<ImportOperationsPage />} />
    <Route path="/import/new" element={<AddImportOperation />} />
    <Route path="/import/details/:id" element={<ImportOperationDetails />} />
    {/* <Route path="/import/edit/:id" element={<OwnerEdit />} /> */}
  </>
   );
}

export default ImportOperationRoutes;