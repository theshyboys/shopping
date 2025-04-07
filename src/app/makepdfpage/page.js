'use client'

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const imagePaths = [
    '/product/001/0.png',
    '/product/001/1.png',
];

export default function MakePDFPage() {
  const pdfRef = useRef();

  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('combined-images.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>

      <div
        ref={pdfRef}
        style={{
          //display: 'flex ',
          flexDirection: 'column', // เปลี่ยนเป็น 'row' ถ้าต้องการเรียงแนวนอน
          //alignItems: 'flex-start',
          background: '#fff',
          //padding: 10,
        }}
      >
        {imagePaths.map((path, index) => (
          <img key={index} src={path} alt={`img-${index}`}  className="justify-center" />
        ))}
      </div>
    </div>
  );
}
