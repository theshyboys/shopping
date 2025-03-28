'use client';

import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
//import 'jspdf-autotable';
import { autoTable } from 'jspdf-autotable';
import { useRouter } from 'next/navigation';
//import font from './RSU_Regular-normal';

export default function PDFGenerator({ cart, subtotal, tax, total, onComplete }) {
  const [status, setStatus] = useState('Generating PDF...');
  const router = useRouter();

  useEffect(() => {
    const generatePDF = () => {
      try {
        setStatus('Creating PDF document...');
        const doc = new jsPDF();
        //doc.addFileToVFS("RSU_Regular-normal.ttf", font); // font คือ base64 string
        //doc.addFont("RSU_Regular-normal.ttf", "RSU_Regular", "normal");
        //doc.setFont("RSU_Regular");


        // Add company header
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 255);
        doc.text('สิงห์ท่า ช็อปปิ้ง', 105, 15, { align: 'center' });
        
        // Order information
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Order #: QRS-${Math.floor(Math.random() * 10000)}`, 14, 37);
        
        // Create table for cart items
        setStatus('Adding product information...');
        const tableColumn = ["Product", "SKU", "Price", "Quantity", "Total"];
        const tableRows = [];
        
        cart.forEach(item => {
          const itemData = [
            item.name,
            //"ปลาส้ม Plasom",
            item.sku || 'N/A',
            `THB${item.price.toFixed(2)}`,
            item.quantity,
            `THB${(item.price * item.quantity).toFixed(2)}`
          ];
          tableRows.push(itemData);
        });
        
        // Generate the table
        autoTable(doc,{
          head: [tableColumn],
          body: tableRows,
          startY: 45,
          theme: 'grid',
          styles: { font : "RSU_Regular",fontSize: 15 },
          headStyles: { fillColor: [255, 120, 120] }
        });
        
        // Add summary information at the bottom
        const finalY = (doc.lastAutoTable.finalY || 45) + 10;
        doc.text(`Subtotal: THB${subtotal.toFixed(2)}`, 150, finalY, { align: 'right' });
        doc.text(`Tax (7%): THB${tax.toFixed(2)}`, 150, finalY + 7, { align: 'right' });
        doc.text(`Total: THB${total.toFixed(2)}`, 150, finalY + 14, { align: 'right' });
        
        // Add thank you message
        doc.setFontSize(11);
        doc.text('Thank you for your purchase!', 105, finalY + 30, { align: 'center' });
        
        // Save the PDF
        setStatus('Saving PDF...');
        doc.save(`QRShop_Order_${new Date().getTime()}.pdf`);
        
        setStatus('Order complete! Redirecting...');
        
        // Allow time for the PDF to download
        setTimeout(() => {
          onComplete();
          router.push('/checkout-success');
        }, 1500);
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        setStatus('Error generating PDF. Please try again.');
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    };
    
    generatePDF();
  }, [cart, subtotal, tax, total, onComplete, router]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Processing Your Order</h2>
        <div className="flex items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <p>{status}</p>
        </div>
        <p className="text-sm text-gray-500">Please do not close this window until the process is complete.</p>
      </div>
    </div>
  );
}