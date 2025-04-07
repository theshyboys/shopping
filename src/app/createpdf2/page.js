'use client'

import { useEffect } from 'react';
import jsPDF from 'jspdf';
//import { useCart } from "../context/CartContext";

const imagePaths = [
  '/product/001/1.png',
  '/product/001/1.png',
];

export default function CreateLongPDF() {
  //const { cart ,loadCart} = useCart();

  const generatePDF = async () => {

    const imagesData = await Promise.all(imagePaths.map(loadImageAsCanvas));






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

    pdf.save('long-images.pdf');
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
      img.src = "/product/" + url.id + "/1.png";//url;
    });
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return <p>Generating long PDF...</p>;
}
