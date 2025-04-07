'use client'

import { useEffect } from 'react';
import jsPDF from 'jspdf';

const imagePaths = [
    '/product/001/0.png',
    '/product/001/1.png',
];

export default function CreatePDF() {
  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < imagePaths.length; i++) {
      const imgUrl = imagePaths[i];
      const img = await loadImageAsDataURL(imgUrl);

      const imgProps = pdf.getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i !== 0) pdf.addPage(); // ไม่ต้อง addPage หน้าแรก
      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save('images.pdf');
  };

  const loadImageAsDataURL = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // เผื่อ public URL มีปัญหา CORS
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = url;
    });
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return <p>Generating PDF...</p>;
}
