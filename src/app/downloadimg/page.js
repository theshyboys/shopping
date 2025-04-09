"use client"
import {  useEffect } from "react";

const downloadImage = () => {
    const link = document.createElement('a');
    link.href = '/product/grp05-2/content.jpg';     // path จาก public
    link.download = 'custom-name-by-code.jpg';    // ชื่อที่ต้องการตั้ง
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  