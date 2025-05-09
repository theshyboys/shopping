"use client"

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Papa from 'papaparse';

export default function Home() {
  const [scannedId, setScannedId] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setScannedId(decodedText);
        scanner.clear(); // ปิดกล้องหลังสแกน
      },
      (error) => {
        // console.warn(error);
      }
    );
  }, []);

  useEffect(() => {
    if (scannedId) {
      fetch('/product/data.csv')
        .then(res => res.text())
        .then(csvText => {
          const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
          });

          const matched = parsed.data.find(row => row.id === scannedId);
          setData(matched || { message: 'ไม่พบข้อมูล' });
        });
    }
  }, [scannedId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">แสกน QR เพื่อดูข้อมูล</h1>

      {!scannedId && <div id="qr-reader" style={{ width: "300px" }}></div>}

      {scannedId && (
        <div className="mt-4">
          <p>📦 ID ที่สแกน: <strong>{scannedId}</strong></p>
          <pre className="bg-gray-100 p-4 mt-2 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
