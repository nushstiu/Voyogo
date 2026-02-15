import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Sidemenu from './Sidemenu';

interface MainLayoutProps {
  children: ReactNode;
  transparent?: boolean;
  showSidemenu?: boolean;
}

export default function MainLayout({ children, transparent = false, showSidemenu }: MainLayoutProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const displaySidemenu = showSidemenu !== undefined ? showSidemenu : isAdmin;

  return (
    <>
      <Header transparent={transparent} />
      <div className={`${displaySidemenu ? 'flex' : ''} pt-20 min-h-screen`}>
        {displaySidemenu && <Sidemenu />}
        <main className={`flex-1 ${displaySidemenu ? '' : ''}`}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
