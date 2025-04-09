"use client";

import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Receipt from "../components/Receipt";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { format } from "date-fns";
import jsPDF from 'jspdf';

export default function ReceiptPage() {
  const receiptRef = useRef(null);
  const router = useRouter();
  const { cart, clearCart, loadCart } = useCart();
  const [time, setTime] = useState("");
  const [data, setData] = useState([]);

  function getTimeNow () {
    const now = new Date();
    const tt = format(now, 'yyyyMMddHHmmss');
    return tt;
  }

  const generatePDF = async () => {
    const imagesData = await Promise.all(cart.map(loadImageAsCanvas));
        // คำนวณความสูงรวมของ PDF
    const pdfWidth = 210; // mm (A4 width)
    let totalHeight = 0;
    const images = [];

    for (const canvas of imagesData) {
      const aspectRatio = canvas.height / canvas.width;
      const imgHeight = pdfWidth * aspectRatio;
      totalHeight += imgHeight;
      images.push({
        dataUrl: canvas.toDataURL('image/png'),
        height: imgHeight,
      });
    }

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [pdfWidth, totalHeight],
    });

    let y = 0;
    for (const img of images) {
      pdf.addImage(img.dataUrl, 'PNG', 0, y, pdfWidth, img.height);
      y += img.height;
    }

    const name = getTimeNow() + ".pdf";
    pdf.save(name);
   // pdf.save('long-images.pdf');
  };

  const loadImageAsCanvas = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.src = "/product/" + url.id + "/detail.png";
    });
  };



  useEffect(() => {
    setData(cart);
    const now = new Date();
    // const formatted = format(now, 'yyyy-MM-dd HH:mm:ss');
    const monthsShort = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const d = format(now, "dd");
    const dd = getOrdinal(Number(d));
    const mon = format(now, "MM");
    const ms = monthsShort[Number(mon) - 1];
    const formatted = ms + " " + dd + format(now, ",yyyy HH:mm");
    setTime(formatted);


      const timer = setTimeout(() => {
        // เปลี่ยนไปยังหน้าหลัก (home) หลังจาก 3 วินาที
        handleDownload();
      }, 1000);

      // ล้างการตั้งเวลาเมื่อคอมโพเนนต์ถูกถอด
      return () => clearTimeout(timer);

  }, []);

  const saveImage = (url) => {
    const link = document.createElement('a');
    link.href = "/product/" + url.id + "/detail.png"; // ต้องเป็น path จาก public
//    link.download = url.id +"-" + url.name_en + "-"+ getTimeNow() + '.png';     // ชื่อไฟล์ที่จะบันทึก
    link.download = url.id +  getTimeNow() + ".png";     // ชื่อไฟล์ที่จะบันทึก

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 
  const handleDownload = async () => {

//    console.log("data.length ", data.length);

    if (receiptRef.current) {
      cart.map(saveImage);


      const canvas = await html2canvas(receiptRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Receipt-" + getTimeNow() + ".png";
      link.click();
      //generatePDF();

    }
    //router.push(`/scan`);
    clearCart();
    //console.log("Clear cart");
  };

  const ScanPage = () => {
    router.push(`/scan`);
    //console.log("Clear cart");
    //clearCart();
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
        <div
          id="receipt"
          className="border w-[350px] bg-white bg-opacity-20 rounded-lg"
        >
          <div ref={receiptRef}>
            <Receipt order={data} time={time} />
          </div>
        </div>
      </div>
      <button 
        className="fixed bottom-2 left-1/2 transform -translate-x-1/2  "
        onClick={ScanPage}
      >
        <img
          src="\images\BT-Scan Qr code.png"
          alt="Click Me"
          className="w-24 hover:opacity-80 transition"
        />
      </button>
    </div>
  );
}
