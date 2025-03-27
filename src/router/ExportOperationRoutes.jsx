import { Route } from "react-router-dom";
import ExportOperationsPage from "../pages/exportOperation/ExportOperationsPage";
import AddExportOperation from "../pages/exportOperation/AddExportOperation";
function ExportOperationRoutes() {
  return (
    <>
      <Route path="/export" element={<ExportOperationsPage />} />
      <Route path="/export/new" element={<AddExportOperation />} />
      <Route path="/import/details/:id" element={<ExportOperationsPage />} />
      <Route path="/import/edit/:id" element={<ExportOperationsPage />} />
    </>
  );
}

export default ExportOperationRoutes;
