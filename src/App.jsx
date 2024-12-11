import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage.jsx'
import './assets/css/global.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // الموضوع
import 'primereact/resources/primereact.min.css';  // الأسلوب العام للمكونات
import 'primeicons/primeicons.css';  // أيقونات PrimeReact
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <>
      <PrimeReactProvider>
      <Routes >
      <Route path='/Login' element={<LoginPage />} />
    </Routes>

      </PrimeReactProvider>
    </>
  )
}

export default App
