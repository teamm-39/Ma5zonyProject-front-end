import { Outlet } from 'react-router-dom';
import NavBar from '../features/NavBar'; // تأكد من استيراد NavBar

const Layout = () => {
    return (
        <div>
            <NavBar />
            <div >
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
