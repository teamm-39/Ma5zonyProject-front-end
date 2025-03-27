import { Route } from "react-router-dom";
import ExportOperationsPage from "../pages/exportOperation/ExportOperationsPage";
import AddExportOperation from "../pages/exportOperation/AddExportOperation";
import ExportOperationDetails from "../pages/exportOperation/exportOperationDetails";
import ExportOperationEdit from "../pages/exportOperation/ExportOperationEdit";
function ExportOperationRoutes() {
  return (
    <>
      <Route path="/export" element={<ExportOperationsPage />} />
      <Route path="/export/new" element={<AddExportOperation />} />
      <Route path="/export/details/:id" element={<ExportOperationDetails />} />
      <Route path="/export/edit/:id" element={<ExportOperationEdit />} />
    </>
  );
}

export default ExportOperationRoutes;
