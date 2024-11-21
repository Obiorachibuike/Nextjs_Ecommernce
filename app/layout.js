"use client";
import { ToastContainer } from "react-toastify";
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import { usePathname } from 'next/navigation';
import AdminLayout from './layout/AdminLayout.js'; // Adjust the path if needed

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {/* Use AdminLayout for admin routes */}
          {isAdminRoute ? (
            <AdminLayout>{children}</AdminLayout>
          ) : (
            <>
              <Header />
              {children}
            </>
          )}
          <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

        </CartProvider>
      </body>
    </html>
  );
}
