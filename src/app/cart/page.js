'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import PDFGenerator from '../components/PDFGenerator';
import ReceiptPage from '../receipt/page';
import { useRouter } from 'next/navigation';


export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const router = useRouter();

  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + tax;
  
  const handleCheckout = () => {
    router.push('/receipt');
    //clearCart();
  };
  
  return (

    <div className="font-DB-PenThai-X text-black">
<div
        className=" min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/05_Cart.png')" }}
        >



      <div className="flex">
        <Link href="javascript:history.back()" className="py-5 px-8 text-2xl font-bold text-blue-600">
          <img src= {'/images/BT-Back.png'} className="h-4" />
        </Link>
        <span className="px-27 py-4 font-dbpenthaix-normal text-[24px]" >Cart</span>
      </div>
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
                    <img src={'/product/'+item.id+'/2.png'} />
                    
                  </div>                          
                </div>
              ))}



          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">  

              <div className="flex justify-between">
                  <span className="font-dbpenthaix-normal text-[20px]" >จำนวนสินค้าทั้งหมด  </span>
                  <span className="font-dbpenthaix-normal  text-[20px] text-[rgb(255, 0, 0)]">{cart.length}</span>
              </div>

              <div className="flex justify-between">
                  <span className="font-dbpenthaix-normal text-[16px]" >Quantity  </span>
                  <span className="font-dbpenthaix-normal text-[16px] " >ชิ้น/piece</span>
              </div>

              <div className="pt-4 mt-4">             
                <button 
                  onClick={handleCheckout}
                  className="w-full text-white rounded-md "
                >
                   <img src="\images\BT-Check out.png"   />
                </button>
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
            //setIsGeneratingPDF(false);
            //clearCart();
          }}
        />
      )}
    </div>
    </div>
    </div>
  );
}