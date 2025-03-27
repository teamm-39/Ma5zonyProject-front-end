import { Route } from "react-router-dom";
import ExportOperationsPage from "../pages/exportOperation/ExportOperationsPage";
import AddExportOperation from "../pages/exportOperation/AddExportOperation";
import ExportOperationDetails from "../pages/exportOperation/exportOperationDetails";
function ExportOperationRoutes() {
  return (
    <>
      <Route path="/export" element={<ExportOperationsPage />} />
      <Route path="/export/new" element={<AddExportOperation />} />
      <Route path="/export/details/:id" element={<ExportOperationDetails />} />
      <Route path="/import/edit/:id" element={<ExportOperationsPage />} />
    </>
  );
}

export default ExportOperationRoutes;
