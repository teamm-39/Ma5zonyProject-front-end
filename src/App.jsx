import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import "./assets/css/global.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // الموضوع
import "primereact/resources/primereact.min.css"; // الأسلوب العام للمكونات
import "primeicons/primeicons.css"; // أيقونات PrimeReact
import { PrimeReactProvider } from "primereact/api";
import NavBar from "./features/NavBar.jsx";
import HomePage from "./pages/home/HomePage.jsx";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Routes>
          <Route element={<NavBar />} >
          <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </PrimeReactProvider>
    </>
  );
}

export default App;
