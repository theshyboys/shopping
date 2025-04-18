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
    link.target = '_blank'; // เปิดในแท็บใหม่ช่วยให้ iOS จัดการได้ดีขึ้น
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // เคลียร์หน่วยความจำ
    URL.revokeObjectURL(url);
  };
  

    const handleDownload = () => {
      const img = new Image();
      img.src = '/product/grp05-2/content.png';
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'nextjs-image.jpg';
          link.target = '_blank'; // เปิดในแท็บใหม่ช่วยให้ iOS จัดการได้ดีขึ้น
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.9);
      };
    };
  


    const saveImageTest = () => {
      const link = document.createElement("a");
      link.href = "/product/grp05-2/content.png"; // ต้องเป็น path จาก public
      link.download = "abcdef.png"; // ชื่อไฟล์ที่จะบันทึก
      console.log("Name : ", link.download);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    

  export default function DownloadButton() {


  useEffect(() => {
    const timer = setTimeout(() => {
        // เปลี่ยนไปยังหน้าหลัก (home) หลังจาก 3 วินาที
        //downloadImage();
      }, 1000);

      // ล้างการตั้งเวลาเมื่อคอมโพเนนต์ถูกถอด
      return () => clearTimeout(timer);

  }, []);


    return (
      <button
//        onClick={handleDownload}
        onClick={saveImageTest}

        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Image
      </button>
    );
  }
  