import { Route } from "react-router-dom";
import ExportOperationsPage from "../pages/exportOperation/ExportOperationsPage";

function ExportOperationRoutes() {
  return (
    <>
      <Route path="/export" element={<ExportOperationsPage />} />
      <Route path="/import/new" element={<ExportOperationsPage />} />
      <Route path="/import/details/:id" element={<ExportOperationsPage />} />
      <Route path="/import/edit/:id" element={<ExportOperationsPage />} />
    </>
  );
}

export default ExportOperationRoutes;
