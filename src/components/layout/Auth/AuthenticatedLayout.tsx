import { Outlet, useLocation } from 'react-router-dom';
import AppNavbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import '@/styles/authorized.css';
import { useState, useEffect } from 'react';
import { useTokenGuard } from '../../../hooks/auth-guard';

export default function AuthenticatedLayout() {
    useTokenGuard()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        if (isSidebarOpen && window.innerWidth < 768) {
            closeSidebar();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isSidebarOpen && window.innerWidth < 768) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isSidebarOpen]);

    return (
        <div className="d-flex flex-column vh-100">
            <AppNavbar onToggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen} />
            <div className="d-flex flex-grow-1">
                <Sidebar isOpen={isSidebarOpen}
                    onCloseSidebar={closeSidebar} />

                {isSidebarOpen && (
                    <div
                        className="sidebar-overlay d-md-none"
                        onClick={closeSidebar}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && closeSidebar()}
                        aria-label="Close sidebar overlay"
                    ></div>
                )}
                <main className="flex-grow-1 p-2">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}