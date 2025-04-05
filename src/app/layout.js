import { Inter } from 'next/font/google';
import './globals.css';
//import Header from './components/Header';
import { CartProvider } from './context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Singhata Shop',
  description: 'Scan QR codes to shop products quickly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>         
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
