'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import PDFGenerator from '../components/PDFGenerator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + tax;
  
  const handleCheckout = () => {
    setIsGeneratingPDF(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8"> 
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Scan a Product to Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
              {cart.map((item) => (
                <div key={item.id} className="flex border-b p-0">
                  <div className="flex items-center justify-center ">
                    <img src={item.icart} />               
                  </div>                          
                </div>
              ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>          
              <div className="border-t pt-4 mt-4">             
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mb-3"
                >
                  Checkout & Save as PDF
                </button>
                <Link 
                  href="/" 
                  className="block text-center w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isGeneratingPDF && (
        <PDFGenerator 
          cart={cart} 
          subtotal={subtotal} 
          tax={tax} 
          total={total} 
          onComplete={() => {
            setIsGeneratingPDF(false);
            clearCart();
          }}
        />
      )}
    </div>
  );
}