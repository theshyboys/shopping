"use client"
import {  useEffect } from "react";

const downloadImage = async () => {
    const response = await fetch('/product/grp05-2/content.png');
    const blob = await response.blob();
  
    const url = URL.createObjectURL(blob);
    const date = new Date();
    const filename = `รูป_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.png`;
  
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // เคลียร์หน่วยความจำ
    URL.revokeObjectURL(url);
  };
  
  
  export default function DownloadButton() {


  useEffect(() => {
    const timer = setTimeout(() => {
        // เปลี่ยนไปยังหน้าหลัก (home) หลังจาก 3 วินาที
        downloadImage();
      }, 1000);

      // ล้างการตั้งเวลาเมื่อคอมโพเนนต์ถูกถอด
      return () => clearTimeout(timer);

  }, []);


    return (
      <button
        onClick={downloadImage}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Image
      </button>
    );
  }
  