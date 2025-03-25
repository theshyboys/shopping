'use client'

import { useRef } from "react";
import html2canvas from "html2canvas";
import Receipt from "./components/Receipt";

export default function ReceiptPage() {
  const receiptRef = useRef(null);

  const order = {
    id: "ORD123456",
    date: "2025-03-24",
    items: [
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },
      { name_th: "เกลือ", zone_th: "เครื่องปรุงคู่ครัวเรือน", name_en:"Salt" , zone_en: "household condiment", status: "READ" },

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

  return (
    <div>
        <div ref={receiptRef}>
            <Receipt order={order} />
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
            onClick={handleDownload}>
            <img
                src="\images\BT-Scan Qr code.png"
                alt="Click Me"
                className="w-24 hover:opacity-80 transition"
            />
        </button>


    </div>
  );
}
