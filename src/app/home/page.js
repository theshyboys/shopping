'use client'

import { useRef } from "react";
import html2canvas from "html2canvas";
import Receipt from "../components/Receipt";
import { useRouter } from 'next/navigation';

export default function ReceiptPage() {
  const receiptRef = useRef(null);
  const router = useRouter();

  const order = {
    id: "ORD123456",
    date: "2025-03-24",
    items: [
      { name_th: "เกลือ เครื่องปรุงคู่ครัวเรือน", zone_th: "ห้วงวิถีชีวิต", name_en:"SALT ,A HOUSEHOLD CONDIMENT" , zone_en: "THE TAPETRY OF LIFE", status: "READ" },

   
    ],
    total: 25,
  };

  const handleDownload = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "receipt.png";
      link.click();
    }
  };


  const ScanPage = () =>{ 
    router.push(`/scan`);
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
                <Receipt order={order} />
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


/**
       <button className="fixed bottom-10 left-22"
            onClick={handleDownload}>
            <img
                src="\images\BT-Save photo.png"
                alt="Click Me"
                className="w-24 hover:opacity-80 transition"
            />
        </button>

        <button className="fixed bottom-10 right-22"
            onClick={handleDownload}>
            <img
                src="\images\BT-Scan Qr code.png"
                alt="Click Me"
                className="w-24 hover:opacity-80 transition"
            />
        </button> 
 */