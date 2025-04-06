'use client';

import { useRef , useState, useEffect} from "react";
import html2canvas from "html2canvas";
import Receipt from "../components/Receipt";
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { format } from 'date-fns';

export default function ReceiptPage() {
  const receiptRef =  useRef(null);
  const router = useRouter();
  const {cart,  clearCart, loadCart } = useCart();

  const [time, setTime] = useState('');

  
    useEffect(() => {
      const now = new Date();
     // const formatted = format(now, 'yyyy-MM-dd HH:mm:ss');
      const monthsShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const d = format(now, 'dd');
      const dd = getOrdinal(Number(d));
      const mon = format(now, 'MM');
      const ms = monthsShort[Number(mon)];
      const formatted = ms + " " + dd + format(now, ',yyyy HH:mm');
      setTime(formatted);
    }, []);

  const handleDownload = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "SINGHATHASHOP " + time + ".png";
      link.click();

      //console.log(receiptRef.current);
    }
    clearCart();
    console.log("Clear cart");
  };


  const ScanPage = () =>{ 
    router.push(`/scan`);
    console.log("Clear cart");
    clearCart();
  };

  function getOrdinal(n) {
    const s = ["TH", "ST", "ND", "RD"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }


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
                <Receipt order={cart} time={time}/>
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

