import '@/css/index.css'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="Container">
            <Header />
            <main className="Main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;