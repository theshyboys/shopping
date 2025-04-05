'use client';

import { useRef } from "react";
import html2canvas from "html2canvas";
import Receipt from "../components/Receipt";
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';


export default function ReceiptPage() {
  const receiptRef =  useRef(null);
  const router = useRouter();
  const {cart,  clearCart, loadCart } = useCart();



  const handleDownload = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "receipt.png";
      link.click();

      //console.log(receiptRef.current);
    }
    //clearCart();
    console.log("Clear cart");
  };


  const ScanPage = () =>{ 
    router.push(`/scan`);
    console.log("Clear cart");
    clearCart();
  };

  return (
    <div className="min-h-screen items-center justify-center">
       <div
        className="flex flex-col items-center  min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/BG.png')" }}
        >
             <div className="p-8 flex items-center justify-center ">
                 <img src="/images/thk.png" alt="Thk" className="w-70" />
            </div>
            <div id="receipt" className="border w-[350px] bg-white bg-opacity-20 rounded-lg">
            <div ref={receiptRef}>
                <Receipt order={cart} />
            </div>
            </div>
        </div>

        <button className="fixed bottom-10 left-22"
            onClick={handleDownload}>
            <img
                src="\images\BT-Save photo.png"
                alt="Click Me"
                className="w-24 hover:opacity-80 transition"
            />
        </button>

        <button className="fixed bottom-10 right-22"
            onClick={ScanPage}>
            <img
                src="\images\BT-Scan Qr code.png"
                alt="Click Me"
                className="w-24 hover:opacity-80 transition"
            />
        </button> 



    </div>
  );
}

