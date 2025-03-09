import { Route, Routes } from "react-router-dom";
import OwnersPage from "../pages/owner/OwnersPage";
import AddOwner from "../pages/owner/AddOwner";
import OwnerDetails from "../pages/owner/OwnerDetails";
import OwnerEdit from "../pages/owner/OwnerEdit";

function OwnerRoutes() {
  return (
    <>
      <Routes>
      <Route path="/" element={<OwnersPage />} />
      <Route path="new" element={<AddOwner />} />
      <Route path="details/:id" element={<OwnerDetails />} />
      <Route path="edit/:id" element={<OwnerEdit />} />
    </Routes>
    </>
  );
}

export default OwnerRoutes;
